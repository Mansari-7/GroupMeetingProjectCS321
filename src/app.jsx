//Import Assets
import windowsXP from './assets/windowsxp.gif';

//Components
import {PreferencesBar, ResultsDisplay} from './components';

export default function app() {
  return (
    <main className="app">
			<Topbar></Topbar>
			<div className="flex mt-4">
				<PreferencesBar></PreferencesBar>
				<ResultsDisplay></ResultsDisplay>
			</div>
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
					<p className="font-pixel text-[10px]">Check out study sessions available for you right now that you might be interested in.</p>
				</div>
			</div>
		</article>
	);
}