"use client";
import { joinSession, leaveSession } from "@/app/actions";

export default function ResultsDisplay({ sessions, onMemberChange }) {
  async function handleJoin(session) {
    await joinSession(session.id, "You");
    onMemberChange(session.id, [...session.members, "You"]);
  }

  async function handleLeave(session) {
    await leaveSession(session.id, "You");
    onMemberChange(session.id, session.members.filter((name) => name !== "You"));
  }

  if (sessions.length == 0) {
    return (
      <main>
        <p className="px-2 font-bold">No sessions found.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden w-full min-w-0">
      <span className="w-full items-end">
        <p className="px-2 font-bold">Results shown below.</p>
      </span>
      {sessions.map((session) => (
        <SessionResult
          key={session.id}
          session={session}
          onJoin={() => handleJoin(session)}
					onLeave={() => handleLeave(session)}
        />
      ))}
    </main>
  );
}

function SessionResult({ session, onJoin, onLeave }) {
	const joined = session.members.includes("You");
	const isFull = session.members.length >= session.capacity;

  return (
    <article className="border rounded-sm bg-[rgb(248,255,216)]">
      <div className="flex">
        {/* Session Title */}
        <div className="p-2">
          <h1 className="font-extrabold">{session.name}</h1>
          <div>
            <span className="flex gap-1">
              <p>⏱︎ {session.time}</p>
            </span>
            <span className="flex gap-1">
              <p>🌐︎ {session.location}</p>
            </span>
          </div>
        </div>

        {/* Compatibility Score and Join Button */}
        <div className="flex flex-col ml-auto mr-2 gap-1">
          <p className="ml-auto mt-2">{session.compatibility}% Match</p>

          {joined ? (
						<div>
							<button
								type="button"
								onClick={onLeave}
								className="join-button"
							>
								Leave
							</button>
							<p className="ml-auto text-sm font-semibold text-[#315510]">✔ Joined</p>
						</div>
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
        <SessionMembers members={session.members} capacity={session.capacity} />
        <div className="border-l border-dashed px-2 ml-auto">
          <StudyProfile session={session} />
        </div>
      </div>
    </article>
  );
}

function StudyProfile({ session }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-5">
      <dt className="font-bold text-gray-600"><p>Subject</p></dt>
      <dd className="text-right"><p>{session.course.replace(" ", "")}</p></dd>

      <dt className="font-bold text-gray-600"><p>Style</p></dt>
      <dd className="text-right"><p>{session.style}</p></dd>

      <dt className="font-bold text-gray-600"><p>Topics</p></dt>
      <dd className="text-right"><p>{session.topics}</p></dd>
    </dl>
  );
}

function SessionMembers({ members, capacity }) {
  return (
    <section>
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
