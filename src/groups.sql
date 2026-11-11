CREATE DATABASE IF NOT EXISTS `groups`;
USE `Groups`;
/*
    password rooten
*/

CREATE TABLE Study_Groups (
    Group_ID INT PRIMARY KEY,
    Course_Name VARCHAR(20),
    Group_Meeting_time DATETIME,
    Group_location VARCHAR(20),
    Group_Max_Capacity INT,
    Group_Current_Size INT
);

CREATE TABLE student (
    Student_id INT PRIMARY KEY,
    Student_name VARCHAR(100)
);

CREATE TABLE group_members(
    Group_ID INT,
    Student_id INT,
    PRIMARY KEY (Group_ID, Student_id),
    Foreign Key (Group_ID) REFERENCES Study_Groups(Group_ID),
    Foreign Key (Student_id) REFERENCES student(Student_id)
);

SELECT DATABASE();
INSERT INTO Study_Groups(Group_ID, Course_Name, Group_Meeting_time, Group_location,
 Group_Max_Capacity, Group_Current_Size)
 VALUES
 ('1', 'CS310', '2026-11-16 15:30:00','In Person', 5, 2),
 ('2', 'PHYS106', '2026-11-18 12:00:00','In Person', 3, 2),
 ('3', 'CS330', '2026-11-21 8:00:00','Online', 3, 2)
 ;

 INSERT INTO student(Student_id, Student_name)
 VALUES
 ('001','Mahad Ansari'),
 ('002','Kellan Griffen'),
 ('003','Yara Benitez'),
 ('004','Lia Huff'),
 ('005','Evelynn Dean'),
 ('006','Wallace Frye')
 ;

 INSERT INTO Group_members(Group_ID, Student_id)
 VALUES
 ('1','001'),
 ('1','006'),
 ('2','004'),
 ('2','003'),
 ('3','005'),
 ('3','002')
 ;
