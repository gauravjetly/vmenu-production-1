#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxN2ZmYjJiMS00MDVmLTQ0NmQtOWE4OC1jNDllNjk4NWQ4ZjUiLCJvcmdhbml6YXRpb25JZCI6ImJjNmYxN2E0LWE3YWQtNGNmYy1iMDRiLWRmMDljM2EzNWU1YyIsInJvbGUiOiJvcmdhbml6YXRpb25fYWRtaW4iLCJpYXQiOjE3NDk2MDY2NDQsImV4cCI6MTc1MDIxMTQ0NH0.zlbGWHf0RJJUjphWruvon0Lkrwqi7aTxTa7QTm4KWLU"

echo "Testing menus API..."
curl -X GET http://localhost:3003/api/menus -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json"