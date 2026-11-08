import {PreferencesBar, ResultsDisplay, TopBar} from './components';

export default function app() {
  return (
		<div className="app flex flex-col gap-4">
      <TopBar />
			<div className="flex">
				<PreferencesBar />
      	<ResultsDisplay />
			</div>
    </div>
  );
}