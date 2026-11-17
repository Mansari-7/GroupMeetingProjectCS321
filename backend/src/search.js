import { db } from "./db.js";

const findMembers = db.prepare(`
  SELECT MemberName
  FROM SESSION_MEMBER
  WHERE SessionID = ?
  ORDER BY MemberName
`);

const findTopics = db.prepare(`
  SELECT TopicName
  FROM SESSION_TOPIC
  WHERE SessionID = ?
`);

export function normalizeMeetingTime(value) {
  const trimmed = String(value ?? "").trim().replace("T", " ");
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(trimmed)) {
    return `${trimmed}:00`;
  }
  return trimmed;
}

function formatGroup(group, extras = {}) {
  const members = findMembers.all(group.SessionID);
  const topics = findTopics.all(group.SessionID);

  return {
    id: group.SessionID,
    name: group.SessionTitle,
    course: group.CourseName,
    time: group.MeetingTime,
    location: group.Location,
    capacity: group.Capacity,
    members: members.map((member) => member.MemberName),
    style: group.StudyStyle,
    topics: topics.map((topic) => topic.TopicName),
    ...extras,
  };
}

export function searchGroups(preferences) {
  const { Courses, Location, Capacity } = preferences;
  const MeetingTime = normalizeMeetingTime(preferences.MeetingTime);
  const preferredTime = new Date(MeetingTime.replace(" ", "T")).getTime();

  let groups = db.prepare(`
    SELECT * FROM SESSION_RESULT
    WHERE CourseName = ?
      AND (
        SELECT COUNT(*) FROM SESSION_MEMBER
        WHERE SESSION_MEMBER.SessionID = SESSION_RESULT.SessionID
      ) < SESSION_RESULT.Capacity
      AND (
        (? = '3 or less' AND Capacity <= 3)
        OR (? = '4' AND Capacity = 4)
        OR (? = '5 or more' AND Capacity >= 5)
      )
      AND (
        (
          LOWER(TRIM(?)) = 'online'
          AND LOWER(TRIM(Location)) = 'online'
        )
        OR (
          LOWER(TRIM(?)) = 'in person'
          AND TRIM(Location) <> ''
          AND LOWER(TRIM(Location)) <> 'online'
        )
      )
      AND DATETIME(MeetingTime) = DATETIME(?)
      AND DATETIME(MeetingTime) >= DATETIME('now', 'localtime')
  `).all(
    Courses,
    Capacity,
    Capacity,
    Capacity,
    Location,
    Location,
    MeetingTime
  );

  if (groups.length === 0) {
    groups = db.prepare(`
      SELECT * FROM SESSION_RESULT
      WHERE CourseName = ?
        AND (
          SELECT COUNT(*) FROM SESSION_MEMBER
          WHERE SESSION_MEMBER.SessionID = SESSION_RESULT.SessionID
        ) < SESSION_RESULT.Capacity
        AND DATE(MeetingTime)
          BETWEEN DATE(?) AND DATE(?, '+7 days')
        AND DATETIME(MeetingTime) >= DATETIME('now', 'localtime')
    `).all(Courses, MeetingTime, MeetingTime);
  }

  const ranked = groups.map((group) => {
    const groupTime = new Date(String(group.MeetingTime).replace(" ", "T")).getTime();
    const hoursApart = Math.abs(groupTime - preferredTime) / (1000 * 60 * 60);

    let timeScore = 0;
    if (hoursApart <= 1) timeScore = 50;
    else if (hoursApart <= 24) timeScore = 40;
    else if (hoursApart <= 72) timeScore = 30;
    else if (hoursApart <= 120) timeScore = 20;
    else if (hoursApart <= 168) timeScore = 10;

    const preferredLocation = Location.trim().toLowerCase();
    const groupLocation = group.Location ? group.Location.trim().toLowerCase() : "";

    let locationScore = 0;
    if (preferredLocation === "online" && groupLocation === "online") {
      locationScore = 30;
    } else if (
      preferredLocation === "in person" &&
      groupLocation !== "" &&
      groupLocation !== "online"
    ) {
      locationScore = 30;
    }

    let capacityScore = 0;
    if (Capacity === "3 or less" && group.Capacity <= 3) capacityScore = 20;
    else if (Capacity === "4" && group.Capacity === 4) capacityScore = 20;
    else if (Capacity === "5 or more" && group.Capacity >= 5) capacityScore = 20;

    return {
      group,
      hoursApart,
      compatibility: timeScore + locationScore + capacityScore,
    };
  });

  ranked.sort((a, b) => {
    if (a.compatibility !== b.compatibility) {
      return b.compatibility - a.compatibility;
    }
    return a.hoursApart - b.hoursApart;
  });

  return ranked.map(({ group, compatibility }) => formatGroup(group, { compatibility }));
}

export function joinSession(sessionId, memberName) {
  const session = db.prepare(`SELECT * FROM SESSION_RESULT WHERE SessionID = ?`).get(sessionId);
  if (!session) return { error: "not_found" };

  const already = db
    .prepare(`SELECT 1 AS found FROM SESSION_MEMBER WHERE SessionID = ? AND MemberName = ?`)
    .get(sessionId, memberName);

  const { total } = db
    .prepare(`SELECT COUNT(*) AS total FROM SESSION_MEMBER WHERE SessionID = ?`)
    .get(sessionId);

  if (!already && total >= session.Capacity) {
    return { error: "full" };
  }

  if (!already) {
    db.prepare(`INSERT INTO SESSION_MEMBER (SessionID, MemberName) VALUES (?, ?)`).run(
      sessionId,
      memberName
    );
  }

  return { group: formatGroup(session) };
}
