import SideBar from './SideBar.jsx';
import TopBar from './TopBar.jsx'
import ResultsDisplay from './ResultsDisplay.jsx';

export default function app() {
  return (
    <div className="app">
      <SideBar />
      <TopBar />
      <ResultsDisplay />
    </div>
  );
}