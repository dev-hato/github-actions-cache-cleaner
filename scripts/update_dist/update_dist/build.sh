#!/usr/bin/env bash

npm ci
npx esbuild --bundle --sourcemap --format=cjs --outdir=dist src/clean-cache.ts
