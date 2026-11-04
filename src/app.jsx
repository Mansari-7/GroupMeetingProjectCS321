import windowsXP from './assets/windowsxp.gif'
import { useState } from "react";

export default function app() {
  return (
    <main className="app">
			<Topbar></Topbar>
			<div className="relative">
				<img src={windowsXP} className="w-66 h-20 object-cover object-center mx-auto"></img>
				<div className="absolute top-0 left-1">
					<h2 className="font-pixel text-lg">Get unstuck now.</h2>
					<p className="font-pixel text-[10px]">We found some study groups available for you right now that you might be interested in.</p>
				</div>
			</div>

			<Room></Room>
			<Room></Room>
    </main>
  );
}

function Topbar() {
	return (
		<article>
			<div className="w-full h-8 bg-[#78AE43] border">
				<p className="font-extrabold">Study Group Finder</p>
			</div>
		</article>
	);
}

function Room() {
  const [joined, setJoined] = useState(false);

  return (
    <article className="border">
			<div className="flex">
				<div className="p-2"><h2 className="font-pixel">Study Room</h2></div>
				<div><span class="border border-[#5c8c2d] bg-[#dff2a5] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#315510]">Best match</span></div>
			</div>
			<div className="flex p-2">
				<button onClick={() => setJoined(true)}
				class="border border-[#164f91] bg-[#2878c5] px-6 py-2.5 text-sm font-extrabold text-white shadow-[inset_1px_1px_0_#70b8ee,inset_-2px_-2px_0_#11559a,2px_2px_0_rgba(24,50,74,.2)] hover:bg-[#3185d2] active:translate-y-px active:shadow-none">
					{joined ? "✔ Joined" : "Join Room"}
				</button>
			</div>
    </article>
  );
}