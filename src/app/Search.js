import {db} from "./db.js";

export function searchGroups(preferences) 
{
    const {Courses, MeetingTime, Location, Capacity} = preferences;

    const preferredTime = new Date(MeetingTime).getTime();

    // Find exact matches
    let groups = db.prepare(`
        SELECT * FROM SESSION_RESULT
        WHERE CourseName = ?
            AND 
            (
                SELECT COUNT(*) FROM SESSION_MEMBER
                WHERE SESSION_MEMBER.SessionID = SESSION_RESULT.SessionID
            ) 
                < SESSION_RESULT.Capacity
            AND 
            (
                (? = '3 or less' AND Capacity <= 3)
                OR (? = '4' AND Capacity = 4)
                OR (? = '5 or more' AND Capacity >= 5)
            )
            AND 
            (
                (
                    LOWER(TRIM(?)) = 'online'
                    AND LOWER(TRIM(Location)) = 'online'
                )
                OR 
                (
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

    // 2. if there are no direct searches then it will look for semi direct
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
        `).all(
            Courses,
            MeetingTime,
            MeetingTime
        );
    }

    // building a compatability score for each one.
    const groupies = groups.map((group) => {
        const groupTime = new Date(group.MeetingTime).getTime();

        const hoursApart =  Math.abs(groupTime - preferredTime) / (1000 * 60 * 60);

        let timeScore = 0;

        if (hoursApart <= 1) 
        {
            timeScore = 50;
        } 
        else if (hoursApart <= 24) 
        {
            timeScore = 40;
        } 
        else if (hoursApart <= 72) 
        {
            timeScore = 30;
        } 
        else if (hoursApart <= 120) 
        {
            timeScore = 20;
        } 
        else if (hoursApart <= 168) 
        {
            timeScore = 10;
        }

        // Location preferances
        let locationScore = 0;

        const preferredLocation = Location.trim().toLowerCase();

        let groupLocation = "";

        if (group.Location !== null) {
            groupLocation = group.Location.trim().toLowerCase();
        }

        if (
            preferredLocation === "online" &&
            groupLocation === "online"
        ) 
        {
            locationScore = 30;
        } 
        else if (
            preferredLocation === "in person" &&
            groupLocation !== "" &&
            groupLocation !== "online"
        ) 
        {
            locationScore = 30;
        }

        // Compare maximum group size with the preferred category.
        let capacityScore = 0;

        if (Capacity === "3 or less" && group.Capacity <= 3) 
        {
            capacityScore = 20;
        } 
        else if (Capacity === "4" && group.Capacity === 4) 
        {
            capacityScore = 20;
        } 
        else if (
            Capacity === "5 or more" &&
            group.Capacity >= 5
        ) 
        {
            capacityScore = 20;
        }

        const compatibilityScore = timeScore + locationScore + capacityScore;
        return Object.assign({}, group, 
        {
            timeScore,
            locationScore,
            capacityScore,
            compatibilityScore,
            hoursApart,
        });
    });

    //sort the groups up, if there is a sort of tie then we compare times
    groupies.sort((a, b) => {
        if (a.compatibilityScore !== b.compatibilityScore) 
        {
            return b.compatibilityScore - a.compatibilityScore;
        }

        return a.hoursApart - b.hoursApart;
    });

    // we need to find the people who make up a group 
    const findMembers = db.prepare(`
        SELECT MemberName
        FROM SESSION_MEMBER
        WHERE SessionID = ?
        ORDER BY MemberName
    `);

    for (const group of groupies) 
    {
        group.members = findMembers.all(group.SessionID);
    }
    //find more information
    const findTopics = db.prepare(`SELECT TopicName FROM SESSION_TOPIC WHERE SessionID = ?`);

    return groupies.map((group) => {
        const topics = findTopics.all(group.SessionID);
    //return everything
    return {
        id: group.SessionID,
        name:group.SessionTitle,
        Course:group.Course,
        time:group.MeetingTime,
        Location:group.Location,
        compatability:group.Capacity,
        members:group.members.map((member) => member.MemberName),
        style:group.StudyStyle,
        topics: topics.map((topic) => topic.TopicName),
    };

    });
}

