import windowsXP from './assets/windowsxp.gif';
import searchIcon from './assets/searchicon.png';
import { useState } from "react";

export default function app() {
  return (
    <main className="app">
			<Topbar></Topbar>
			<div className="flex relative">
				<img src={windowsXP} className="w-66 h-20 object-cover object-center mx-auto"></img>
				<div className="absolute px-1">
					<h1 className="font-pixel text-lg">Get unstuck now.</h1>
					<p className="font-pixel text-[10px]">We found some study rooms available for you right now that you might be interested in.</p>
				</div>
			</div>

			<RoomResult></RoomResult>
			<RoomResult></RoomResult>
    </main>
  );
}

function Topbar() {
	return (
		<article>
			<div className="flex w-full h-8 bg-[#78AE43] border-b p-1">
				<img src={searchIcon} className="w-6 h-6"></img>
				<h1 className="font-pixel font-extrabold">Study Room Finder</h1>
			</div>
		</article>
	);
}

function RoomResult() {
  const [joined, setJoined] = useState(false);

  return (
    <article className="border rounded-sm bg-[rgb(248,255,216)] hover:bg-[rgb(204,255,0)]">
			<div className="flex">
				<div className="p-2"><h1 className="font-pixel">Study Room</h1></div>
				<div><span className="best-match">Best match</span></div>
			</div>
			<div className="flex p-2 justify-end gap-2">
				<RoomDetails></RoomDetails>
				<button onClick={() => setJoined(true)}
				className="join-button">
					{joined ? "✔ Joined" : "Join Room"}
				</button>
			</div>
    </article>
  );
}

function RoomDetails() {
	return (
		<article className="mt-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
			<h3 className="text-[12px] font-bold">CS 321 Study Group</h3>
			<p>Meeting Time: Wednesday, 3:00 PM</p>
			<p>Location: Fenwick Library</p>
			<p>Compatibility: 95%</p>
		</article>
	);
}