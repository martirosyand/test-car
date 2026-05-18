#!/bin/bash

echo "======================================"
echo " Starting GT Auto Full-Stack App      "
echo "======================================"

# Ensure mongodb is running locally (Assuming brew installation)
echo "Starting local MongoDB (if installed via brew)..."
brew services start mongodb-community@7.0 2>/dev/null || echo "Ensure MongoDB is running manually if not via brew."

# Install dependencies if they haven't been installed
echo "Installing backend dependencies..."
cd backend && npm install

echo "Installing frontend dependencies..."
cd ../frontend && npm install

cd ..

# Start backend in background
echo "Starting backend..."
cd backend && npm start &
BACKEND_PID=$!

# Start frontend in background
echo "Starting frontend..."
cd frontend && npm run dev &
FRONTEND_PID=$!

echo "======================================"
echo " GT Auto should be running on:        "
echo " Backend: http://127.0.0.1:5000"
echo " Frontend: http://localhost:5173      "
echo "======================================"
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
