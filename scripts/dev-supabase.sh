#!/bin/bash

# Cleanup function to stop Supabase when script exits
cleanup() {
  echo "Stopping Supabase..."
  npx supabase stop
  exit 0
}

# Set up trap to catch SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start Supabase
echo "Starting Supabase..."
npx supabase start

# Check if Supabase started successfully
if [ $? -eq 0 ]; then
  echo "Supabase is running. Press Ctrl+C to stop."
  # Keep the script running indefinitely
  # This allows the trap to work when Ctrl+C is pressed
  while true; do
    sleep 1
  done
else
  echo "Failed to start Supabase"
  exit 1
fi
