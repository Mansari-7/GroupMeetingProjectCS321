'use client'
import TopBar from "@/components/TopBar";
import PreferencesBar from "@/components/PreferencesBar";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useState } from 'react';

export default function HomeClient({ initialSessions }) {
	const [sessions, setSessions] = useState(initialSessions);

	function changeMembers(id, members) {
		setSessions(sessions.map((session) => (session.id === id ? {...session, members: members} : session)))
	}

	return (
		<div className="app flex flex-col gap-4">
			<TopBar />
			<div className="flex">
				<PreferencesBar onSearch={setSessions}/>
				<ResultsDisplay sessions={sessions} onMemberChange={changeMembers}/>
			</div>
		</div>
	);
}
