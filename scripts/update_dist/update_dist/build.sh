#!/usr/bin/env bash

npm ci
tsc --noEmit
npx esbuild --bundle --format=cjs --outdir=dist src/clean-cache.ts
