"use client";

import { useState } from "react";
import { getSessions } from "@/app/actions";

export default function PreferencesBar({ onSearch }) {
  const [preferences, setPreferences] = useState({
    capacity: "",
    location: "",
    course: "",
    meetingTime: "",
  });

  async function handleChange(event) {
    const { name, value } = event.target;

		const newPreferences = {...preferences, [name]: value };
    setPreferences(newPreferences);

		const sessions = await getSessions(newPreferences);
		onSearch(sessions);
  }

  return (
    <aside className="sidenav mr-4 flex flex-col gap-1">
      <section className="bg-[rgb(162,199,83)] font-bold px-2 py-1">
        <header>Preferences ⚙︎</header>
      </section>

      <form>
        <section className="px-2 flex flex-col gap-0.5 mb-4">
          <label htmlFor="capacity">Capacity</label>
          <select
            name="capacity"
            id="capacity"
            value={preferences.capacity}
            onChange={handleChange}
          >
						<option value="">Any</option>
            <option value="3">3 or less</option>
            <option value="4">4</option>
            <option value="5">5 or more</option>
          </select>

          <label htmlFor="location">Location</label>
          <select
            name="location"
            id="location"
            value={preferences.location}
            onChange={handleChange}
          >
						<option value="">Any</option>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>

          <label htmlFor="course">Course</label>
          <select
            name="course"
            id="course"
            value={preferences.course}
            onChange={handleChange}
          >
						<option value="">Any</option>
            <option value="CS 110">CS 110</option>
            <option value="CS 112">CS 112</option>
            <option value="CS 211">CS 211</option>
            <option value="CS 262">CS 262</option>
            <option value="CS 310">CS 310</option>
            <option value="CS 321">CS 321</option>
            <option value="CS 330">CS 330</option>
            <option value="CS 367">CS 367</option>
            <option value="CS 471">CS 471</option>
            <option value="CS 483">CS 483</option>
            <option value="MATH 113">MATH 113</option>
            <option value="MATH 114">MATH 114</option>
            <option value="MATH 125">MATH 125</option>
            <option value="MATH 203">MATH 203</option>
            <option value="PHYS 106">PHYS 106</option>
            <option value="PHYS 160">PHYS 160</option>
            <option value="ECE 301">ECE 301</option>
            <option value="ECE 285">ECE 285</option>
            <option value="STAT 344">STAT 344</option>
            <option value="IT 104">IT 104</option>
          </select>

          <label htmlFor="meetingTime">MeetingTime</label>
          <input
            type="datetime-local"
            name="meetingTime"
            id="meetingTime"
            value={preferences.meetingTime}
            onChange={handleChange}
          />
        </section>
      </form>
    </aside>
  );
}
