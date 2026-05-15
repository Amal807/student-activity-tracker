# Student Activity Tracker

A complete mini full-stack project built with React and FastAPI to track student activities. It allows users to log their activities, view them in a table, and see a summary of total entries, total hours, and the most active user.

## Tech Stack
- **Frontend**: React (Vite), Axios, clean CSS styling
- **Backend**: Python, FastAPI, SQLAlchemy
- **Database**: SQLite (local file database)

## Features
- Add a new activity (Student Name, Activity Description, Hours)
- View a list of all logged activities
- View a dynamic summary (Total Entries, Total Hours, Most Active User)
- **Bonus:** Delete an activity
- **Bonus:** SQLite integration for persistent data storage
- Full frontend validation & loading states

## Folder Structure
```text
student-activity-tracker/
├── backend/
│   ├── main.py          # FastAPI application & routes
│   ├── database.py      # SQLite connection setup
│   ├── models.py        # SQLAlchemy database models
│   ├── schemas.py       # Pydantic schemas for data validation
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # React UI components (Form, List, Summary)
│   │   ├── services/    # Axios API calls
│   │   ├── App.jsx      # Main application view & state
│   │   └── App.css      # Custom styling
│   ├── package.json     # Node dependencies
│   └── vite.config.js   # Vite configuration
└── README.md
```

## Backend Setup
1. Open a terminal and navigate to the `backend` folder.
   ```bash
   cd backend
   ```
2. (Optional) Create a virtual environment.
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies.
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server using Uvicorn.
   ```bash
   uvicorn main:app --reload
   ```
5. The API will be running at `http://localhost:8000`. You can view the automatic Swagger UI docs at `http://localhost:8000/docs`.

## Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder.
   ```bash
   cd frontend
   ```
2. Install the Node modules.
   ```bash
   npm install
   ```
3. Start the Vite development server.
   ```bash
   npm run dev
   ```
4. The React app will be running at `http://localhost:5173`. Open this URL in your browser.

## API Endpoints

### 1. Get All Activities
**GET** `/activities`
- Returns a list of all logged activities.

### 2. Add Activity
**POST** `/activities`
- **Body:** `{"name": "Amal", "activity": "Coding", "hours": 3}`
- Returns the successfully created activity.

### 3. Get Summary
**GET** `/summary`
- Returns metrics: total entries, total hours, and most active user.

### 4. Delete Activity
**DELETE** `/activities/{id}`
- Deletes an activity by its ID.

## API Testing Examples (cURL)

**Add an activity:**
```bash
curl -X POST "http://localhost:8000/activities" \
     -H "Content-Type: application/json" \
     -d '{"name": "Amal", "activity": "FastAPI Setup", "hours": 2}'
```

**Get all activities:**
```bash
curl -X GET "http://localhost:8000/activities"
```

**Get summary:**
```bash
curl -X GET "http://localhost:8000/summary"
```

## Future Improvements
- Implement User Authentication / Logins.
- Add editing functionality for existing activities.
- Implement pagination for the activity list if the dataset grows large.
- Deploy the backend (e.g., Render/Heroku) and frontend (e.g., Vercel/Netlify).
