#!/usr/bin/env bash

npm ci
npx esbuild --bundle --outdir=dist --format=esm src/clean-cache.ts
