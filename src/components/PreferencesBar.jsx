
"use client";

import { useState } from "react";

export default function PreferencesBar() {
  const [preferences, setPreferences] = useState({
    Capacity: "",
    Location: "",
    Courses: "",
    MeetingTime: "",
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
            <option value="Fenwick Library">In person</option>
            <option value="Horizon Hall">In person</option>
            <option value="Johnson Center">In person</option>
            <option value="Online">Online</option>
          </select>

          <label htmlFor="Courses">Courses</label>
          <select
            name="Courses"
            id="Courses"
            value={preferences.Courses}
            onChange={handleChange}
          >
            <option value="CS 330">CS330</option>
            <option value="CS 321">CS321</option>
            <option value="PHYS 106">PHYS106</option>
            <option value="ECE 301">ECE301</option>
            <option value="CS 310">CS310</option>
          </select>

          <label htmlFor="MeetingTime">MeetingTime</label>
          <input
            type="datetime-local"
            name="MeetingTime"
            id="MeetingTime"
            value={preferences.MeetingTime}
            onChange={handleChange}
          />
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
