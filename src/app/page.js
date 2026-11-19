import HomeClient from "@/components/HomeClient";
import { getSessions } from "@/app/actions";

export default async function Home() {
  const defaultPrefs = {
    capacity: "",
    location: "",
    course: "",
    meetingTime: "",
  };

  const sessions = await getSessions(defaultPrefs);

  return (
		<HomeClient initialSessions={sessions}></HomeClient>
  );
}
