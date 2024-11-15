#!/bin/bash

# Create the directory and file if they don't exist
mkdir -p system_db
touch system_db/shrine_data.db
cp example.env .env

./npm.sh

echo "Done. Don't forget to edit your .env file."