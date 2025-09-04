#!/usr/bin/env bash
# Fail in CI, warn locally
set -uo pipefail
is_ci="${CI:-}"

upper_count=$(git ls-files 'pages/**/*' | grep -c '[A-Z]' || true)
nested_count=$(git ls-files 'pages/pages/*' 2>/dev/null | wc -l | tr -d ' ')

if [ "$upper_count" -gt 0 ]; then
  echo "❌ Uppercase filenames under /pages are not allowed."
  git ls-files 'pages/**/*' | grep '[A-Z]' || true
  [ -n "$is_ci" ] && exit 1
fi

if [ "$nested_count" -gt 0 ]; then
  echo "❌ Nested /pages/pages is not allowed."
  git ls-files 'pages/pages/*' || true
  [ -n "$is_ci" ] && exit 1
fi

exit 0
