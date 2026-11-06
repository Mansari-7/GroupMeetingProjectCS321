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
    <section>
      <h2>Study Group Results</h2>
      {GROUPS.map((group) => {
        const joined = joinedIds.includes(group.id);
        return (
          <article
            key={group.id}
            className="mt-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
            <p>Meeting Time: {group.time}</p>
            <p>Location: {group.location}</p>
            <p>Compatibility: {group.compatibility}%</p>
            {joined && (
              <p className="mt-1 text-sm font-semibold text-[#315510]">Joined</p>
            )}
            <button
              type="button"
              onClick={() => setSelectedId(group.id)}
              className="mt-3 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              View details
            </button>
          </article>
        );
      })}
    </section>
  );
}
