#!/usr/bin/env bash

STAGE=dev

source .envrc

cd apps/web

pnpm install && pnpm run build
