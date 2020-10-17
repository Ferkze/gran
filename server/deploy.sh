docker build . -t gran-server

docker tag gran-server granfinance.azurecr.io/gran-server

docker push granfinance.azurecr.io/gran-server