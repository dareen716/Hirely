#!/bin/bash

echo "🚀 Starting Hirely MVP..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${BLUE}Starting Backend...${NC}"
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend starting on http://localhost:5001${NC}"

sleep 2

echo ""
echo -e "${BLUE}Starting Frontend...${NC}"
cd ../frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend starting on http://localhost:3000${NC}"

echo ""
echo -e "${GREEN}✓ Hirely MVP is running!${NC}"
echo ""
echo -e "${BLUE}Demo Credentials:${NC}"
echo "  Student: ahmed@example.com / password123"
echo "  Employer: startup@example.com / password123"
echo ""
echo "Open http://localhost:3000 in your browser"
echo ""
echo "To stop the servers, press Ctrl+C"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
