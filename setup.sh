#!/bin/bash

# Mazuri Waste Management System - Setup Script

echo "================================"
echo "Mazuri Waste Management System"
echo "Setup and Installation Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js found: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm found: $(npm -v)"

# Check if MongoDB is available (optional)
if command -v mongod &> /dev/null; then
    echo "✓ MongoDB found"
else
    echo "ℹ MongoDB not installed locally. Make sure to use MongoDB Atlas or Docker for database."
fi

echo ""
echo "Installing dependencies..."
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Backend dependencies installed successfully"
else
    echo "✗ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd client
npm install

if [ $? -eq 0 ]; then
    echo "✓ Frontend dependencies installed successfully"
else
    echo "✗ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "Creating .env file from template..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ .env file created. Please update it with your configuration."
else
    echo "✓ .env file already exists"
fi

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Make sure MongoDB is running"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For more information, see README.md"
