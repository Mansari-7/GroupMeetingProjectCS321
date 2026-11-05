export default function GroupDetails({ group, joined, onBack, onConfirm }) {
  const spotsOpen = group.capacity - group.members.length;
  const isFull = spotsOpen <= 0;

  return (
    <section aria-labelledby="group-details-title">
      <button type="button" onClick={onBack} className="text-sm text-blue-700 hover:underline">
        Back to results
      </button>

      <h2 id="group-details-title" className="font-pixel mt-2 text-xl">
        {joined ? "You're in!" : "Join this group?"}
      </h2>

      <div className="mt-2 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
        <p>Course: {group.course}</p>
        <p>Meeting Time: {group.time}</p>
        <p>Location: {group.location}</p>
        <p>Compatibility: {group.compatibility}%</p>
        <p>
          Members: {group.members.length}/{group.capacity}
          {isFull ? " (full)" : ` (${spotsOpen} ${spotsOpen === 1 ? "spot" : "spots"} open)`}
        </p>

        <h4 className="mt-3 text-sm font-bold text-gray-900">Who's in the group</h4>
        <ul className="mt-1 space-y-1">
          {group.members.map((name) => (
            <li key={name} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dff2a5] text-[10px] font-bold text-[#315510]"
              >
                {name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              {name}
            </li>
          ))}
        </ul>
      </div>

      {joined ? (
        <p
          role="status"
          className="mt-3 rounded-lg border border-[#5c8c2d] bg-[#dff2a5] p-3 text-sm font-semibold text-[#315510]"
        >
          You joined {group.name}. See you {group.time} at {group.location}.
        </p>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isFull}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isFull ? "Group is full" : "Confirm and join"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}