
"use client";

import { useState } from "react";

export default function PreferencesBar() {
  const [preferences, setPreferences] = useState({
    Capacity: "5 or more",
    Location: "In Person",
    Courses: "CS330",
    MeetingTime: "3:30",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted preferences:", preferences);
  }

  return (
    <aside className="sidenav mr-4 flex flex-col gap-1">
      <section className="bg-[rgb(162,199,83)] font-bold px-2 py-1">
        <header>Preferences ⚙︎</header>
      </section>

      <form onSubmit={handleSubmit}>
        <section className="px-2 flex flex-col gap-0.5 mb-4">
          <label htmlFor="Capacity">Capacity</label>
          <select
            name="Capacity"
            id="Capacity"
            value={preferences.Capacity}
            onChange={handleChange}
          >
            <option value="3 or less">3 or less</option>
            <option value="4">4</option>
            <option value="5 or more">5 or more</option>
          </select>

          <label htmlFor="Location">Location</label>
          <select
            name="Location"
            id="Location"
            value={preferences.Location}
            onChange={handleChange}
          >
            <option value="In Person">In person</option>
            <option value="Online">Online</option>
          </select>

          <label htmlFor="Courses">Courses</label>
          <select
            name="Courses"
            id="Courses"
            value={preferences.Courses}
            onChange={handleChange}
          >
            <option value="CS330">CS330</option>
            <option value="CS321">CS321</option>
            <option value="PHYS106">PHYS106</option>
            <option value="ECE301">ECE301</option>
            <option value="CS310">CS310</option>
          </select>

          <label htmlFor="MeetingTime">Meeting Time</label>
          <select
            name="MeetingTime"
            id="MeetingTime"
            value={preferences.MeetingTime}
            onChange={handleChange}
          >
            <option value="3:30">3:30</option>
            <option value="4:30">4:30</option>
            <option value="5:30">5:30</option>
            <option value="6:30">6:30</option>
            <option value="7:30">7:30</option>
          </select>
        </section>

        <section className="px-2 mt-2 mb-3">
          <button type="submit" className="apply-button">
            Apply
          </button>
        </section>
      </form>
    </aside>
  );
}
