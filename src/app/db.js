import Database from "better-sqlite3";
export const db = new Database("app.db");

db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS SESSION_RESULT (
	SessionID INTEGER,
	SessionTitle TEXT,

	MeetingTime TEXT,
	Location TEXT,

	CourseName TEXT,
	StudyStyle TEXT,

	Capacity INTEGER,
	CurrentSize INTEGER,

	PRIMARY KEY (SessionID)
);

CREATE TABLE IF NOT EXISTS SESSION_MEMBER (
	SessionID INTEGER,
	MemberName TEXT,

	PRIMARY KEY (SessionID, MemberName),
	FOREIGN KEY (SessionID) REFERENCES SESSION_RESULT (SessionID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SESSION_TOPICS (
	SessionID INTEGER,
	TopicName TEXT,

	PRIMARY KEY (SessionID, TopicName),
	FOREIGN KEY (SessionID) REFERENCES SESSION_RESULT (SessionID) ON DELETE CASCADE
);
	`);