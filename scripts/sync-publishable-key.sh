#!/usr/bin/env bash
# Copies the backend's publishable API key into the storefront env.
#
# Reseeding creates a NEW publishable key, and a storefront still holding the
# old one gets empty product lists rather than an error — the store API answers
# 200 with zero results. Run this after every reseed.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
env_file="$root/apps/storefront/.env.local"

: "${PGHOST:=localhost}"
: "${PGPORT:=5433}"
: "${PGUSER:=ustah}"
: "${PGDATABASE:=ustah}"
: "${PGPASSWORD:=ustah}"
export PGHOST PGPORT PGUSER PGDATABASE PGPASSWORD

key="$(psql -tAc "select token from api_key where type='publishable' and revoked_at is null order by created_at limit 1;" | tr -d '[:space:]')"

if [ -z "$key" ]; then
  echo "No publishable key found in $PGDATABASE. Seed the backend first." >&2
  exit 1
fi

if [ ! -f "$env_file" ]; then
  echo "Missing $env_file" >&2
  exit 1
fi

# BSD sed (macOS) needs the empty -i argument.
sed -i '' "s|^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$key|" "$env_file"
echo "Synced publishable key -> $key"
