#!/usr/bin/env bash

npm ci
npx ncc build --source-map src/clean-cache.ts
