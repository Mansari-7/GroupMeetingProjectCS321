//'use client'
import TopBar from "@/components/TopBar";
import PreferencesBar from "@/components/PreferencesBar";
import ResultsDisplay from "@/components/ResultsDisplay";
//import { useState } from 'react';
import { getSessions } from "@/app/actions";

export default async function Home({ searchParams }) {
	//const [sessions, setSessions] = useState([]);
	const params = await searchParams;
	const prefs = {
    capacity: params.capacity ?? "",
    location: params.location ?? "",
    course: params.course ?? "",
    meetingTime: params.meetingTime ?? "",
  };

  const sessions = await getSessions(prefs);

  return (
    <div className="app flex flex-col gap-4">
      <TopBar />
			<div className="flex">
				<PreferencesBar preferences={prefs}/>
      	<ResultsDisplay sessions={sessions}/>
			</div>
    </div>
  );
}
