#!/usr/bin/env bash

npm ci
esbuild --bundle --outdir=dist src/clean-cache.ts
