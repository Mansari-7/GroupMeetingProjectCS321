"use client";
import { useState } from "react";

export default function ResultsDisplay({groups, setGroups}) {
	const [joinedIds, setJoinedIds] = useState([]);

	const handleJoin = (id) => {
		console.log('handled join');
		const updatedGroups = groups.map((group) => {
			if (group.id !== id) return group;

			const newMembers = [...group.members, "You"];
			return { ...group, members: newMembers };
		});

		setGroups(updatedGroups);
		setJoinedIds([...joinedIds, id]);
	};

  return (
    <main className="flex flex-col gap-2">
			<span className="w-full items-end">
				<p className="px-2 font-bold">Results shown below.</p>
			</span>
      {groups.length === 0 && <p>No matching study groups found.</p>}
      {groups.map((group) => (
        <SessionResult
          key={group.id}
          group={group}
					joined={joinedIds.includes(group.id)}
          onJoin={() => handleJoin(group.id)}
        />
      ))}
    </main>
  );
}

function SessionResult({ group, joined, onJoin }) {
	const isFull = group.members.length >= group.capacity;

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

        {/* Compatibility Score and Join Button */}
        <div className="flex flex-col ml-auto mr-2 gap-1">
          <p className="ml-auto mt-2">{group.compatibility}% Match</p>

          {joined ? (
            <p className="ml-auto text-sm font-semibold text-[#315510]">✔ Joined</p>
          ) : (
						<button
							type="button"
							onClick={onJoin}
							className={isFull ? "full-button" : "join-button"}
							disabled={isFull}
						>
							{isFull ? "Full": "Join"}
						</button>
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
