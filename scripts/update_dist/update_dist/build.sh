#!/usr/bin/env bash

npm ci
npx ncc build src/clean-cache.ts
