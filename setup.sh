#!/bin/bash

# SK Voting System Setup Script
# This script sets up the SK Voting System database and seeds it with initial data

# ANSI color codes for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}SK Voting System Setup${NC}"
echo -e "${BLUE}======================${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${YELLOW}Creating .env file...${NC}"
  echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/skvoting?schema=public\"" > .env
  echo "NEXTAUTH_URL=\"http://localhost:3000\"" >> .env
  echo "NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\"" >> .env
  echo -e "${GREEN}Created .env file with default values${NC}"
else
  echo -e "${GREEN}Found existing .env file${NC}"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
  echo -e "${RED}Failed to install dependencies${NC}"
  exit 1
fi
echo -e "${GREEN}Dependencies installed successfully${NC}"

# Database setup
echo -e "${BLUE}Setting up database...${NC}"
echo -e "${YELLOW}This will push the schema to the database defined in your .env file${NC}"
echo -e "${YELLOW}It will create new tables if they don't exist${NC}"
read -p "Continue? (Y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ || $REPLY == "" ]]; then
  npx prisma db push
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push database schema${NC}"
    echo -e "${YELLOW}Make sure your DATABASE_URL is correctly set in .env${NC}"
    exit 1
  fi
  echo -e "${GREEN}Database schema created successfully${NC}"
else
  echo -e "${YELLOW}Database setup skipped${NC}"
fi

# Seed database
echo -e "${BLUE}Seeding database with initial data...${NC}"
echo -e "${YELLOW}This will populate the database with roles, permissions and demo users${NC}"
read -p "Continue? (Y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ || $REPLY == "" ]]; then
  npx prisma db seed
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to seed database${NC}"
    exit 1
  fi
  echo -e "${GREEN}Database seeded successfully${NC}"
else
  echo -e "${YELLOW}Database seeding skipped${NC}"
fi

# Start Prisma Studio
echo -e "${BLUE}Do you want to start Prisma Studio to view your database?${NC}"
read -p "Start Prisma Studio? (Y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ || $REPLY == "" ]]; then
  echo -e "${BLUE}Starting Prisma Studio...${NC}"
  echo -e "${YELLOW}Press Ctrl+C to stop Prisma Studio${NC}"
  npx prisma studio
fi

echo -e "${GREEN}SK Voting System setup complete!${NC}"
echo -e "${BLUE}You can now start the development server with:${NC}"
echo -e "${YELLOW}npm run dev${NC}"
echo
echo -e "${BLUE}Demo users (password for all: password123)${NC}"
echo -e "${YELLOW}- voter@example.com${NC} (Voter role)"
echo -e "${YELLOW}- candidate@example.com${NC} (Voter and Candidate roles)"
echo -e "${YELLOW}- admin@example.com${NC} (Administrator role)"
echo -e "${YELLOW}- officer@example.com${NC} (Election Officer role)"
echo -e "${YELLOW}- auditor@example.com${NC} (Auditor role)"
