'use client'
import TopBar from "@/components/TopBar";
import PreferencesBar from "@/components/PreferencesBar";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useState } from 'react';

export default function HomeClient({ initialSessions }) {
	const [sessions, setSessions] = useState(initialSessions);

	return (
		<div className="app flex flex-col gap-4">
			<TopBar />
				<div className="flex items-start gap-6">
			<PreferencesBar onSearch={setSessions} />

			<div className="min-w-0 flex-1">
			<ResultsDisplay sessions={sessions} />
			</div>
			</div>
		</div>
	);
}
