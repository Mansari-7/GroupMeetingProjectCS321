export default function GroupDetails({ group, joined, onBack, onConfirm }) {
  const spotsOpen = group.capacity - group.members.length;
  const isFull = spotsOpen <= 0;

  return (
    <section aria-labelledby="group-details-title">
      <button type="button" onClick={onBack} className="details__back">
        Back to results
      </button>

      <h2 id="group-details-title" className="font-pixel details__title">
        {joined ? "You're in!" : "Join this group?"}
      </h2>

      <div className="details__card">
        <h3 className="group-card__title">{group.name}</h3>
        <p>Course: {group.course}</p>
        <p>Meeting Time: {group.time}</p>
        <p>Location: {group.location}</p>
        <p>Compatibility: {group.compatibility}%</p>
        <p>
          Members: {group.members.length}/{group.capacity}
          {isFull ? " (full)" : ` (${spotsOpen} ${spotsOpen === 1 ? "spot" : "spots"} open)`}
        </p>

        <h4 className="details__heading">Who's in the group</h4>
        <ul className="member-list">
          {group.members.map((name) => (
            <li key={name} className="member">
              <span aria-hidden="true" className="member__avatar">
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
        <p role="status" className="details__success">
          You joined {group.name}. See you {group.time} at {group.location}.
        </p>
      ) : (
        <div className="details__actions">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isFull}
            className="btn btn--primary"
          >
            {isFull ? "Group is full" : "Confirm and join"}
          </button>
          <button type="button" onClick={onBack} className="btn btn--secondary">
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}
