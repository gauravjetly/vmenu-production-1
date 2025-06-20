#!/bin/bash

echo "=== VMenu Deployment Diagnosis ==="
echo "Date: $(date)"
echo ""

# 1. Check if site is accessible
echo "1. Testing site accessibility..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://vintiqmenus.com
echo ""

# 2. Check for CSS files
echo "2. Checking for CSS files..."
echo "Looking for Tailwind CSS..."
curl -s https://vintiqmenus.com | grep -E "(tailwind|_next/static/css)" | head -5
echo ""

# 3. Check for JavaScript files
echo "3. Checking for JavaScript files..."
curl -s https://vintiqmenus.com | grep -E "_next/static/chunks" | head -5
echo ""

# 4. Check API endpoint
echo "4. Testing API health endpoint..."
curl -s https://vintiqmenus.com/api/health || echo "API health check failed"
echo ""

# 5. Check for Next.js build ID
echo "5. Checking for Next.js build ID..."
curl -s https://vintiqmenus.com | grep -E "buildId" | head -2
echo ""

# 6. Check response headers
echo "6. Response headers..."
curl -s -I https://vintiqmenus.com | head -15
echo ""

# 7. Check if accessing ALB directly works
echo "7. Testing ALB directly..."
curl -s -o /dev/null -w "ALB HTTP Status: %{http_code}\n" http://vintiq-alb-976178116.us-east-1.elb.amazonaws.com
echo ""

# 8. Check page source structure
echo "8. Checking page structure (first 50 lines)..."
curl -s https://vintiqmenus.com | head -50
echo ""

echo "=== Diagnosis Complete ==="