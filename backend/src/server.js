import cors from "cors";
import express from "express";
import { joinSession, searchGroups } from "./search.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/search", (req, res) => {
  const { Courses, MeetingTime, Location, Capacity } = req.body ?? {};

  if (!Courses || !MeetingTime || !Location || !Capacity) {
    res.status(400).json({
      error: "Courses, MeetingTime, Location, and Capacity are required.",
    });
    return;
  }

  res.json(searchGroups({ Courses, MeetingTime, Location, Capacity }));
});

app.post("/api/sessions/:id/join", (req, res) => {
  const sessionId = Number(req.params.id);
  const memberName = String(req.body?.memberName ?? "You").trim() || "You";

  if (!Number.isInteger(sessionId)) {
    res.status(400).json({ error: "Session id must be a number." });
    return;
  }

  const result = joinSession(sessionId, memberName);

  if (result.error === "not_found") {
    res.status(404).json({ error: "Study session not found." });
    return;
  }

  if (result.error === "full") {
    res.status(409).json({ error: "This study session is full." });
    return;
  }

  res.json(result.group);
});

app.listen(port, () => {
  console.log(`Study session API listening on http://localhost:${port}`);
});
