import { useState } from "react";
import { PreferencesBar, ResultsDisplay, TopBar } from "./components";

export default function App() {
  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState("");

  async function handleSearch(preferences) {
    setStatus("Searching...");

    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      setGroups([]);
      setStatus("Search failed. Check the preferences and try again.");
      return;
    }

    const results = await response.json();
    setGroups(results);
    setStatus(results.length === 0 ? "No matching study groups found." : "");
  }

  async function handleJoin(id) {
    const response = await fetch(`/api/sessions/${id}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberName: "You" }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setStatus(body.error || "Could not join that study session.");
      return null;
    }

    setStatus("");
    return response.json();
  }

  return (
    <div className="app flex flex-col gap-4">
      <TopBar />
      <div className="flex">
        <PreferencesBar onSearch={handleSearch} />
        <div className="flex flex-col gap-2">
          {status && <p className="px-2 font-bold">{status}</p>}
          <ResultsDisplay groups={groups} setGroups={setGroups} onJoin={handleJoin} />
        </div>
      </div>
    </div>
  );
}
