#!/usr/bin/env bash

npm ci
npx esbuild --bundle --platform=node --outdir=dist src/clean-cache.ts
