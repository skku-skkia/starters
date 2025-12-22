#!/usr/bin/env bash

STAGE=dev

source .envrc

cd apps/server

./gradlew build
