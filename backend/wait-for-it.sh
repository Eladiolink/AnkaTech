#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
cmd="$@"

until nc -z ${host%:*} ${host#*:}; do
  >&2 echo "DB is unavailable - sleeping"
  sleep 1
done

>&2 echo "DB is up - executing command"
exec $cmd
