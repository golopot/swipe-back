#!/usr/bin/env zx

const base = path.resolve(__dirname, "..");
const manifest = require("../extension/manifest.json");
const files = await glob(`${base}/extension/**/*`);
await $`rm -rf ${base}/releases`;
await $`mkdir ${base}/releases`;
await $`zip ${base}/releases/swipe-back.${manifest.version}.zip ${files}`;
