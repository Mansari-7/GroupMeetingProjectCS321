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
					<p className="font-pixel text-lg">Get unstuck now.</p>
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
				<p className="font-pixel font-extrabold">Study Room Finder</p>
			</div>
		</article>
	);
}

function RoomResult() {
  const [joined, setJoined] = useState(false);

  return (
    <article className="border rounded-sm bg-[rgb(248,255,216)] hover:bg-[rgb(204,255,0)]">
			<div className="flex">
				<div className="p-2"><p className="font-pixel">Study Room</p></div>
				<div><span className="best-match">Best match</span></div>
			</div>
			<div className="flex p-2 justify-end font-pixel">
				<button onClick={() => setJoined(true)}
				className="join-button">
					{joined ? "✔ Joined" : "Join Room"}
				</button>
			</div>
    </article>
  );
}