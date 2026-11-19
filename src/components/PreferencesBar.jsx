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

  //function handleSubmit(event) {
  //  event.preventDefault();
	//	const formData = new FormData(event.target);
	//	const formValues = Object.fromEntries(formData.entries());
	//	setPreferences(formValues);
  //}

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
            <option value="In Person">Fenwick Library</option>
            <option value="In Person">Horizon Hall</option>
            <option value="In Person">Johnson Center</option>
            <option value="Online">Online</option>
          </select>

          <label htmlFor="course">Courses</label>
          <select
            name="course"
            id="course"
            value={preferences.course}
            onChange={handleChange}
          >
						<option value="">Any</option>
            <option value="CS 330">CS330</option>
            <option value="CS 321">CS321</option>
            <option value="PHYS 106">PHYS106</option>
            <option value="ECE 301">ECE301</option>
            <option value="CS 310">CS310</option>
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

        {/*<section className="px-2 mt-2 mb-3">
          <button type="submit" className="apply-button">
            Apply
          </button>
        </section>*/}
      </form>
    </aside>
  );
}
