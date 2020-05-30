#!/bin/bash

docker run --network="gran_appnetwork" -v=$(pwd)/server:/root/server -w="/root/server" node:12.2.0-alpine npm run seed
