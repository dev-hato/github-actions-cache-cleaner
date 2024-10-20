#!/usr/bin/env bash

npm ci
esbuild --bundle --outdir=dist --format=esm src/clean-cache.ts
