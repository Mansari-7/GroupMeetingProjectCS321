import Database from "better-sqlite3";
const db = new Database("app.db");

db.pragma("foreign_keys = ON");

db.exec(``);