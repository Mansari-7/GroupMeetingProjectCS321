
import { useState } from "react";

const initialPreferences = {
  Capacity: "5 or more",
  Location: "In person",
  Courses: "CS 321",
  MeetingTime: "2026-11-18T15:00",
};

export default function PreferencesBar({ onSearch }) {
  const [preferences, setPreferences] = useState(initialPreferences);

  function handleChange(event) {
    const { name, value } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(preferences);
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
            <option value="In person">In person</option>
            <option value="Online">Online</option>
          </select>

          <label htmlFor="Courses">Courses</label>
          <select
            name="Courses"
            id="Courses"
            value={preferences.Courses}
            onChange={handleChange}
          >
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

          <label htmlFor="MeetingTime">MeetingTime</label>
          <input
            type="datetime-local"
            name="MeetingTime"
            id="MeetingTime"
            value={preferences.MeetingTime}
            onChange={handleChange}
            required
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
