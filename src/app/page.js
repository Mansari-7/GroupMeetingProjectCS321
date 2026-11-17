//import Image from "next/image";
import TopBar from "@/components/TopBar";
import PreferencesBar from "@/components/PreferencesBar";
import ResultsDisplay from "@/components/ResultsDisplay";

export default function Home() {
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
