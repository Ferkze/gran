#!/bin/bash

# docker login granfinance.azurecr.io

docker build . -t gran-client

docker tag gran-client granfinance.azurecr.io/gran-client

docker push granfinance.azurecr.io/gran-client