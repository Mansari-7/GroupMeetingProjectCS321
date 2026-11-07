//Import Assets
import windowsXP from './assets/windowsxp.gif';
import { useState } from "react";

export default function app() {
  return (
    <main className="app">
			<Topbar></Topbar>
			<SessionResult></SessionResult>
			<SessionResult></SessionResult>
    </main>
  );
}

function Topbar() {
	return (
		<article>
			<div className="w-full h-8 bg-[rgb(162,199,83)] p-1">
				<h1 className="font-pixel font-extrabold">📚 Study Session Finder</h1>
			</div>
			<div className="flex relative">
				<img src={windowsXP} className="w-full h-20 object-cover object-center mx-auto"></img>
				<div className="absolute px-1">
					<h1 className="font-pixel text-lg">Get unstuck now.</h1>
					<p className="font-pixel text-[10px]">Check out the study sessions available for you right now that you might be interested in.</p>
				</div>
			</div>
		</article>
	);
}

function SessionResult() {
  const [joined, setJoined] = useState(false);

  return (
    <article className="border rounded-sm bg-[rgb(248,255,216)]">
			<div className="flex">
				{/* Session Title */}
				<div className="p-2">
					<h1 className="font-extrabold">CS 321 Study Mania</h1>
					<div>
						<span className="flex gap-1">
							<p>⏱︎ Wednesday, 3:00 PM</p>
						</span>
						<span className="flex gap-1">
							<p>🌐︎ Fenwick Library</p>
						</span>
					</div>
				</div>

				{/* Compatibility Score and Join Button */}
				<div className="flex flex-col ml-auto mr-2 gap-1">
					<p className="ml-auto mt-2">95% Match</p>
					<button onClick={() => setJoined(true)}
					className="join-button">
						{joined ? "✔ Joined" : "Join session"}
					</button>
				</div>
			</div>

			{/* SessionMembers and StudyProfile */}
			<div className="flex p-2 gap-2">
				<SessionMembers></SessionMembers>
				<div className="border-l border-dashed px-2 ml-auto">
					<StudyProfile></StudyProfile>
				</div>
			</div>
    </article>
  );
}

function StudyProfile() {
	return (
		<dl className="grid grid-cols-[auto_1fr] gap-x-5">
			<dt className="font-bold text-gray-600"><p>Subject</p></dt>
			<dd className="text-right"><p>CS321</p></dd>

			<dt className="font-bold text-gray-600"><p>Style</p></dt>
			<dd className="text-right"><p>Casual</p></dd>

			<dt className="font-bold text-gray-600"><p>Topics</p></dt>
			<dd className="text-right"><p>Dynamic Dispatch</p></dd>
		</dl>
	);
}

function SessionMembers() {
	return (
		<section className="max-w-52">
			<div className="flex flex-wrap gap-1 mt-1 mb-1">
				<div className="flex gap-1">
					<span className="flex justify-center items-center w-6 h-6 rounded-full bg-[rgb(209,232,98)] text-[10px] text-[#3f5400]">AB</span>
					<p className="mt-1">Abdicus Bingo</p>
				</div>
				<div className="flex gap-1">
					<span className="flex justify-center items-center w-6 h-6 rounded-full bg-[rgb(209,232,98)] text-[10px] text-[#3f5400]">AB</span>
					<p className="mt-1">Abdicus Bingo</p>
				</div>
				<div className="flex gap-1">
					<span className="flex justify-center items-center w-6 h-6 rounded-full bg-[rgb(209,232,98)] text-[10px] text-[#3f5400]">AB</span>
					<p className="mt-1">Abdicus Bingo</p>
				</div>
				<div className="flex gap-1">
					<span className="flex justify-center items-center w-6 h-6 rounded-full bg-[rgb(209,232,98)] text-[10px] text-[#3f5400]">AB</span>
					<p className="mt-1">Abdicus Bingo</p>
				</div>
			</div>
			<p>4/4 members</p>
		</section>
	);
}

//function SessionDetails() {
//	return (
//		<section className="mt-3 bg-white p-4 shadow-sm">
//			<h3 className="text-[12px] font-bold">CS 321 Study Mania</h3>
//			<span className="flex gap-1">
//				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//					<circle cx="12" cy="12" r="10"/>
//					<polyline points="12 6 12 12 16.5 12"/>
//				</svg>
//				<p>Wednesday, 3:00 PM</p>
//			</span>
//			<span className="flex gap-1">
//				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//					<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
//					<circle cx="12" cy="10" r="3"/>
//				</svg>
//				<p>Fenwick Library</p>
//			</span>
//			<p>Compatibility: 95%</p>
//			<SessionMembers></SessionMembers>
//		</section>
//	);
//}