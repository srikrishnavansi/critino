#!/usr/bin/env bash

(cd services/api && nixpacks build . -o . --start-cmd "fastapi dev src --host 0.0.0.")

docker compose build && docker compose up api
