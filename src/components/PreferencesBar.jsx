"use client";
export default function PreferencesBar() {
  return (
    <aside className="sidenav mr-4 flex flex-col gap-1">
			<section className="bg-[rgb(162,199,83)] font-bold px-2 py-1">
				<header>Preferences ⚙︎</header>
			</section>
			<section className="px-2 flex flex-col gap-0.5 mb-4">
				<label htmlFor="Capacity">Capacity</label>
				<select name="Capacity" id="Capacity" defaultValue="5 or more">
					<option value="3 or less">3 or less</option>
					<option value="4">4</option>
					<option value="5 or more">5 or more</option>
				</select>

				<label htmlFor="Location">Location</label>
				<select name="Location" id="Location">
					<option value="In Person">In person</option>
					<option value="Online">Online</option>
				</select>

				<label htmlFor="Courses">Courses</label>
				<select name="Courses" id="Courses">
					<option value="CS330">CS330</option>
					<option value="CS321">CS321</option>
					<option value="PHYS106">PHYS106</option>
					<option value="ECE301">ECE301</option>
					<option value="CS310">CS310</option>
				</select>

				<label htmlFor="MeetingTime">Meeting Time</label>
				<select name="MeetingTime" id="MeetingTime">
					<option value="3:30">3:30</option>
					<option value="4:30">4:30</option>
					<option value="5:30">5:30</option>
					<option value="6:30">6:30</option>
					<option value="7:30">7:30</option>
				</select>
			</section>

			{/*<section className="px-2 mt-2 mb-3">
				<button className="apply-button">Apply</button>
			</section>*/}
    </aside>
  );
}