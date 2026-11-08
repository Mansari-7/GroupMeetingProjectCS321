import { useState } from "react";
import GroupDetails from "./GroupDetails.jsx";

// Placeholder data
const GROUPS = [
  {
    id: 1,
    name: "CS 321 Study Group",
    course: "CS 321",
    time: "Wednesday, 3:00 PM",
    location: "Fenwick Library",
    compatibility: 95,
    capacity: 6,
    members: ["Ana Torres", "Ben Okafor", "Sam Patel", "Lee Nguyen"],
    style: "Casual",
    topics: "Dynamic Dispatch",
  },
  {
    id: 2,
    name: "CS 310 Midterm Prep",
    course: "CS 310",
    time: "Tuesday, 3:00 PM",
    location: "Horizon Hall",
    compatibility: 82,
    capacity: 5,
    members: ["Dana Cruz", "Eli Brooks", "Maya Chen"],
    style: "Focused",
    topics: "Hash Tables",
  },
  {
    id: 3,
    name: "CS 367 Project Club",
    course: "CS 367",
    time: "Thursday, 4:30 PM",
    location: "Johnson Center",
    compatibility: 64,
    capacity: 4,
    members: ["Jo Kim", "Raj Singh", "Tess Wu", "Omar Ali"],
    style: "Project work",
    topics: "Memory Management",
  },
];

export default function ResultsDisplay() {
  const [selectedId, setSelectedId] = useState(null);
  const [joinedIds, setJoinedIds] = useState([]);

  const selected = GROUPS.find((g) => g.id === selectedId);

  if (selected) {
    return (
      <GroupDetails
        group={selected}
        joined={joinedIds.includes(selected.id)}
        onBack={() => setSelectedId(null)}
        onConfirm={() => setJoinedIds((ids) => [...ids, selected.id])}
      />
    );
  }

  return (
    <section className="flex flex-col gap-2">
      {GROUPS.map((group) => (
        <SessionResult
          key={group.id}
          group={group}
          joined={joinedIds.includes(group.id)}
          onViewDetails={() => setSelectedId(group.id)}
        />
      ))}
    </section>
  );
}

function SessionResult({ group, joined, onViewDetails }) {
  return (
    <article className="border rounded-sm bg-[rgb(248,255,216)]">
      <div className="flex">
        {/* Session Title */}
        <div className="p-2">
          <h1 className="font-extrabold">{group.name}</h1>
          <div>
            <span className="flex gap-1">
              <p>⏱︎ {group.time}</p>
            </span>
            <span className="flex gap-1">
              <p>🌐︎ {group.location}</p>
            </span>
          </div>
        </div>

        {/* Compatibility Score and View Details Button */}
        <div className="flex flex-col ml-auto mr-2 gap-1">
          <p className="ml-auto mt-2">{group.compatibility}% Match</p>
          <button
            type="button"
            onClick={onViewDetails}
            className="details-button"
          >
            View details
          </button>
          {joined && (
            <p className="ml-auto text-sm font-semibold text-[#315510]">✔ Joined</p>
          )}
        </div>
      </div>

      {/* SessionMembers and StudyProfile */}
      <div className="flex p-2 gap-2">
        <SessionMembers members={group.members} capacity={group.capacity} />
        <div className="border-l border-dashed px-2 ml-auto">
          <StudyProfile group={group} />
        </div>
      </div>
    </article>
  );
}

function StudyProfile({ group }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-5">
      <dt className="font-bold text-gray-600"><p>Subject</p></dt>
      <dd className="text-right"><p>{group.course.replace(" ", "")}</p></dd>

      <dt className="font-bold text-gray-600"><p>Style</p></dt>
      <dd className="text-right"><p>{group.style}</p></dd>

      <dt className="font-bold text-gray-600"><p>Topics</p></dt>
      <dd className="text-right"><p>{group.topics}</p></dd>
    </dl>
  );
}

function SessionMembers({ members, capacity }) {
  return (
    <section className="max-w-52">
      <div className="flex flex-wrap gap-1 mt-1 mb-1">
        {members.map((name) => (
          <div key={name} className="flex gap-1">
            <span className="flex justify-center items-center w-6 h-6 rounded-full bg-[rgb(209,232,98)] text-[10px] text-[#3f5400]">
              {name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <p className="mt-1">{name}</p>
          </div>
        ))}
      </div>
      <p>{members.length}/{capacity} members</p>
    </section>
  );
}
