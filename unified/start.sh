#!/bin/sh

echo
echo "============================================"
echo "  Computer Organization Quiz - Local Server"
echo "============================================"
echo
echo "  URL: http://localhost:8000/index.html"
echo "  Press Ctrl+C to stop"
echo "============================================"
echo

if ! command -v python3 >/dev/null 2>&1; then
    if ! command -v python >/dev/null 2>&1; then
        echo "[ERROR] Python not found"
        echo "  macOS:   brew install python3"
        echo "  Ubuntu:  sudo apt install python3"
        exit 1
    fi
    PYTHON=python
else
    PYTHON=python3
fi

$PYTHON -m http.server 8000 &
SERVER_PID=$!
sleep 2

URL="http://localhost:8000/index.html"
if command -v open >/dev/null 2>&1; then
    open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$URL"
fi

echo "Server running... Press Ctrl+C to stop."
trap "kill $SERVER_PID 2>/dev/null; echo 'Stopped.'; exit 0" INT TERM
wait $SERVER_PID
