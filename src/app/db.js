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
  (3, 'CS 367 Project Club',  '2026-11-19 16:30', 'Johnson Center',  'CS 367', 'Project work', 4),
	(4, 'CS 110 Programming Basics', '2026-11-20 10:00', 'Fenwick Library', 'CS 110', 'Casual', 5),
  (5, 'CS 112 Java Practice', '2026-11-20 14:00', 'Horizon Hall', 'CS 112', 'Focused', 6),
  (6, 'CS 211 Data Structures', '2026-11-21 11:00', 'Johnson Center', 'CS 211', 'Collaborative', 5),
  (7, 'CS 262 Computer Systems', '2026-11-21 15:00', 'Online', 'CS 262', 'Focused', 4),
  (8, 'CS 330 Theory Review', '2026-11-22 13:00', 'Fenwick Library', 'CS 330', 'Focused', 6),
  (9, 'CS 471 Operating Systems', '2026-11-22 16:00', 'Online', 'CS 471', 'Collaborative', 5),
  (10, 'CS 483 Algorithms', '2026-11-23 12:00', 'Horizon Hall', 'CS 483', 'Focused', 4),
  (11, 'MATH 113 Calculus Review', '2026-11-23 15:00', 'Fenwick Library', 'MATH 113', 'Casual', 6),
  (12, 'MATH 114 Calculus II', '2026-11-24 11:00', 'Johnson Center', 'MATH 114', 'Collaborative', 5),
  (13, 'MATH 125 Discrete Math', '2026-11-24 14:00', 'Online', 'MATH 125', 'Focused', 4),
  (14, 'MATH 203 Linear Algebra', '2026-11-25 10:00', 'Horizon Hall', 'MATH 203', 'Collaborative', 6),
  (15, 'PHYS 106 Physics Review', '2026-11-25 13:00', 'Fenwick Library', 'PHYS 106', 'Casual', 5),
  (16, 'PHYS 160 Physics Practice', '2026-11-26 15:00', 'Online', 'PHYS 160', 'Focused', 4),
  (17, 'ECE 301 Circuits Study', '2026-11-27 11:00', 'Johnson Center', 'ECE 301', 'Collaborative', 6),
  (18, 'ECE 285 Engineering Review', '2026-11-27 14:00', 'Horizon Hall', 'ECE 285', 'Focused', 5),
  (19, 'STAT 344 Statistics Practice', '2026-11-28 12:00', 'Online', 'STAT 344', 'Casual', 4),
  (20, 'IT 104 Technology Review', '2026-11-28 16:00', 'Fenwick Library', 'IT 104', 'Collaborative', 5);

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
  (3, 'Omar Ali'),
	(4, 'Alex Rivera'),
  (4, 'Jordan Lee'),
  (5, 'Taylor Morgan'),
  (5, 'Casey Brooks'),
  (5, 'Morgan Patel'),
  (6, 'Jamie Chen'),
  (6, 'Avery Davis'),
  (7, 'Riley Johnson'),
  (7, 'Skyler Brown'),
  (8, 'Cameron Wilson'),
  (8, 'Parker Smith'),
  (8, 'Quinn Taylor'),
  (9, 'Reese Martin'),
  (9, 'Drew Anderson'),
  (10, 'Emerson White'),
  (10, 'Finley Clark'),
  (11, 'Harper Lewis'),
  (11, 'Logan Walker'),
  (12, 'Blake Hall'),
  (12, 'Rowan Young'),
  (13, 'Sage Allen'),
  (13, 'Charlie King'),
  (14, 'Dakota Wright'),
  (14, 'River Scott'),
  (15, 'Phoenix Green'),
  (15, 'Kendall Adams'),
  (16, 'Micah Baker'),
  (16, 'Alexis Nelson'),
  (17, 'Jules Carter'),
  (17, 'Robin Mitchell'),
  (18, 'Noah Perez'),
  (18, 'Mia Roberts'),
  (19, 'Liam Turner'),
  (19, 'Emma Phillips'),
  (20, 'Olivia Campbell'),
  (20, 'Ethan Parker');

INSERT OR IGNORE INTO SESSION_TOPIC (SessionID, TopicName) VALUES
  (1, 'Dynamic Dispatch'),
  (2, 'Hash Tables'),
  (3, 'Memory Management'),
	(4, 'Programming Fundamentals'),
  (5, 'Java and Object-Oriented Programming'),
  (6, 'Linked Lists and Trees'),
  (7, 'Computer Architecture'),
  (8, 'Automata and Computability'),
  (9, 'Processes and Threads'),
  (10, 'Algorithm Analysis'),
  (11, 'Derivatives and Limits'),
  (12, 'Integration Techniques'),
  (13, 'Logic and Proofs'),
  (14, 'Matrices and Vectors'),
  (15, 'Physics Concepts'),
  (16, 'Mechanics'),
  (17, 'Circuit Analysis'),
  (18, 'Engineering Fundamentals'),
  (19, 'Probability and Statistics'),
  (20, 'Information Technology Fundamentals');
`);