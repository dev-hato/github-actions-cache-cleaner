#!/usr/bin/env bash

npm ci
npx esbuild --bundle --outdir=dist --format=cjs src/clean-cache.ts
