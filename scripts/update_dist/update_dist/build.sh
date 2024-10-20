#!/usr/bin/env bash

npm ci
npx esbuild --bundle --outdir=dist src/clean-cache.ts
