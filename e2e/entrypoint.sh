#!/bin/bash
set -e

./wait-for-it.sh frontend:3001 -t 60 -- npm run test
