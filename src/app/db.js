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

	PRIMARY KEY (SessionID)
);

CREATE TABLE IF NOT EXISTS SESSION_MEMBER (
	SessionID INTEGER,
	MemberName TEXT,

	PRIMARY KEY (SessionID, MemberName),
	FOREIGN KEY (SessionID) REFERENCES SESSION_RESULT (SessionID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SESSION_TOPIC (
	SessionID INTEGER,
	TopicName TEXT,

	PRIMARY KEY (SessionID, TopicName),
	FOREIGN KEY (SessionID) REFERENCES SESSION_RESULT (SessionID) ON DELETE CASCADE
);

INSERT OR IGNORE INTO SESSION_RESULT
  (SessionID, SessionTitle, MeetingTime, Location, CourseName, StudyStyle, Capacity)
VALUES
  (1, 'CS 321 Study Group',   '2026-11-18 15:00', 'Fenwick Library', 'CS 321', 'Casual',       6),
  (2, 'CS 310 Midterm Prep',  '2026-11-17 15:00', 'Horizon Hall',    'CS 310', 'Focused',      5),
  (3, 'CS 367 Project Club',  '2026-11-19 16:30', 'Johnson Center',  'CS 367', 'Project work', 4);

INSERT OR IGNORE INTO SESSION_MEMBER (SessionID, MemberName) VALUES
  (1, 'Ana Torres'),
  (1, 'Ben Okafor'),
  (1, 'Sam Patel'),
  (1, 'Lee Nguyen'),
  (2, 'Dana Cruz'),
  (2, 'Eli Brooks'),
  (2, 'Maya Chen'),
  (3, 'Jo Kim'),
  (3, 'Raj Singh'),
  (3, 'Tess Wu'),
  (3, 'Omar Ali');

INSERT OR IGNORE INTO SESSION_TOPIC (SessionID, TopicName) VALUES
  (1, 'Dynamic Dispatch'),
  (2, 'Hash Tables'),
  (3, 'Memory Management');
`);