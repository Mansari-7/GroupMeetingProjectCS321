'use client'
import TopBar from "@/components/TopBar";
import PreferencesBar from "@/components/PreferencesBar";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useState } from 'react';

export default function Home() {
	const [sessions, setSessions] = useState([]);

  return (
    <div className="app flex flex-col gap-4">
      <TopBar />
			<div className="flex">
				<PreferencesBar onSearch={setSessions}/>
      	<ResultsDisplay sessions={sessions}/>
			</div>
    </div>
  );
}
