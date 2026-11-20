'use server'
import { db } from "@/app/db";

export async function getSessions(prefs) {
	// Score out of 100: course 40, capacity 20, location 20, time 20.
	const rows = db.prepare(`
		SELECT
			SessionID, SessionTitle, MeetingTime, Location, CourseName, StudyStyle, Capacity,
			(
				CASE WHEN CourseName = @course
							OR (@course = '') THEN 40 ELSE 0 END
				+ CASE WHEN (@capacity = 3 AND Capacity <= 3)
							OR (@capacity = 4 AND Capacity = 4)
							OR (@capacity >= 5 AND Capacity >= 5)
							OR (@capacity = 0) THEN 20 ELSE 0 END
				+ CASE WHEN (@location = 'Online' AND Location = 'Online')
							OR (@location = 'In Person' AND Location != 'Online')
							OR (@location = '') THEN 20 ELSE 0 END
				+ CASE WHEN (CAST(substr(MeetingTime, 12, 2) AS INTEGER) = @hour
							AND substr(MeetingTime, 1, 10) = @day)
							OR (@hour = -99) THEN 20
						WHEN (ABS(CAST(substr(MeetingTime, 12, 2) AS INTEGER) - @hour) = 1
							AND substr(MeetingTime, 1, 10) = @day) THEN 10
						ELSE 0 END
			) AS Compatibility
		FROM SESSION_RESULT
		ORDER BY Compatibility DESC
	`).all({
		course: prefs.course,
		capacity: Number(prefs.capacity),
		location: prefs.location,
		day: prefs.meetingTime ? prefs.meetingTime.slice(0,10) : "",
		hour: prefs.meetingTime ? Number(prefs.meetingTime.slice(11, 13)) : -99
	});

	// Build the shape ResultsDisplay expects
	const sessions = [];
	for (const row of rows) {
		const members = db
			.prepare("SELECT MemberName FROM SESSION_MEMBER WHERE SessionID = ?")
			.all(row.SessionID)
			.map((m) => m.MemberName);

		const topics = db
			.prepare("SELECT TopicName FROM SESSION_TOPIC WHERE SessionID = ?")
			.all(row.SessionID)
			.map((t) => t.TopicName)
			.join(", ");

		sessions.push({
			id: row.SessionID,
			name: row.SessionTitle,
			course: row.CourseName,
			time: row.MeetingTime,
			location: row.Location,
			compatibility: row.Compatibility,
			capacity: row.Capacity,
			members: members,
			style: row.StudyStyle,
			topics: topics,
		});
	}

	return sessions;
}

export async function joinSession(sessionID, newMember) {
	db.prepare(`
		INSERT INTO SESSION_MEMBER VALUES (?, ?)
	`).run(sessionID, newMember);
}

export async function leaveSession(sessionID, memberToRemove) {
	db.prepare(`
		DELETE FROM SESSION_MEMBER WHERE SessionID = ? AND MemberName = ?
	`).run(sessionID, memberToRemove);
}