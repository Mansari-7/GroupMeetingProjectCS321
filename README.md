# Study Session Finder

The system displays a list of relevant study session results and then the user can manually join that study session.

The app is split into two parts that talk over HTTP:

- `frontend/` is the React app. It sends preference filters to `POST /api/search` and joins a session with `POST /api/sessions/:id/join`.
- `backend/` is the API and SQLite database. Search results use `id`, `name`, `course`, `time`, `location`, `capacity`, `members`, `style`, `topics`, and `compatibility`.

## Demo
<img className="w-full" alt="studyroomfinderdemo" src="./public/studysessionfinder_demo.gif" />

## Installation

**1. Install Node.js**

This will allow us to run any command involving the **npm** keyword.
To verify you have node.js installed, run the following command:
```bash
node -v
npm -v
```

If you do not have node.js installed, you can either:
- Download Node.js directly from: https://nodejs.org.
- Use a software management tool, such as Chocolatey for Windows or Brew for MacOS, and running one of the following commands:
```bash
choco install node # This is for Windows
brew install node # This is for MacOS
```

**2. Clone this repository**

Run the following command to clone the repository on your local computer:
```bash
git clone https://github.com/Mansari-7/GroupMeetingProjectCS321.git
```

**3. Install Dependencies**
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

## Deployment

From the project root, start the API and the web app together:

```bash
npm run dev
```

The API listens on [http://localhost:3001](http://localhost:3001). The web app is at [http://localhost:5173](http://localhost:5173) and proxies `/api` to the backend.

To terminate the program, use ```Ctrl+C```.

## Project Credits

- [Mahad Ansari](https://github.com/Mansari-7)
- [Hajar Bouaicha](https://github.com/hbouaich)
- [Ryan Anderson](https://github.com/randerson112)
- [Brian Le](https://github.com/relbian)
- [Sulabh Pant](https://github.com/Sulabh192)
