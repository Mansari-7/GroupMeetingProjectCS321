import windowsXP from './assets/windowsxp.gif'
import ResultsDisplay from './ResultsDisplay.jsx';
import SideBar from './sidebar.jsx';

export default function app() {
  return (
    <div className="app">
      <SideBar />
      <p>Test app</p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">don't click me</button>
			<h2 class="font-pixel">Pointers &amp; Pastries</h2>
			<span class="border border-[#5c8c2d] bg-[#dff2a5] px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#315510]">Best match</span>
			<img src={windowsXP} alt=""></img>
      <ResultsDisplay />
    </div>
  );
}