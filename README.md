# GiftBox

GiftBox is a full-stack project consisting of a Python **FastAPI** backend and a React frontend. Data is stored in MongoDB and both services are set up for local development.

## Requirements

- **Python 3.10+**
- **Node.js 18+** (with `npm` or `yarn`)
- **MongoDB** running on `mongodb://localhost:27017`

## Backend Setup

1. Create and activate a virtual environment.
2. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Copy `backend/.env` if needed and adjust `MONGO_URL` or `DB_NAME`.
4. Start the API server:
   ```bash
   uvicorn backend.server:app --reload --port 8000
   ```
   The backend listens on **http://localhost:8000**.

## Frontend Setup

1. From the `frontend` directory install packages:
   ```bash
   yarn install
   ```
2. Run the development server:
   ```bash
   yarn start
   ```
   The frontend is served at **http://localhost:3000** and proxies API requests to the backend.

## Default Ports

- FastAPI backend: `8000`
- React frontend: `3000`
- MongoDB: `27017`

Follow these steps to get both components running locally.
