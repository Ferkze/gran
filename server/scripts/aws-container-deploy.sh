#!/bin/bash
docker build -t gran-server .
docker tag gran-server:latest public.ecr.aws/v8d8e3t3/gran-cr:latest
docker push public.ecr.aws/v8d8e3t3/gran-cr:latest