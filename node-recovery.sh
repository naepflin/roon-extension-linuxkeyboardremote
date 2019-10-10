#!/bin/bash
# NodeJS respawn script, replace path for node with location where you downloaded the code

until node .; do
    date +"%r"
    echo "Server 'nodejs' crashed with exit code $?.  Respawning.." >&2
sleep 1
done

exit 0
