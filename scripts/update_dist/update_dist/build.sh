#!/usr/bin/env bash

npm ci
npx esbuild --bundle --format=cjs --outdir=dist src/clean-cache.ts
