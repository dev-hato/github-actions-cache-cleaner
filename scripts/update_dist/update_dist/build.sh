#!/usr/bin/env bash
set -e

npm ci
npx --no-install tsc --noEmit
npx esbuild --bundle --format=cjs --outdir=dist src/clean-cache.ts
