#!/usr/bin/env bash

npm ci
npx ncc build -o dist/clean-cache/ src/clean-cache.ts
