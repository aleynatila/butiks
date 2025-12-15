#!/bin/bash

# Butiks Backend Quick Test Script
# Tests all major endpoints to verify backend is working

BASE_URL="http://localhost:5000"
API_URL="${BASE_URL}/api/v1"

echo "🧪 Testing Butiks Backend API..."
echo "================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Test function
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local expected_status=$4
    
    echo -n "Testing: $description ... "
    
    response=$(curl -s -w "\n%{http_code}" -X $method "$endpoint")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$status_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (${status_code})"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: ${expected_status}, Got: ${status_code})"
        ((FAILED++))
    fi
}

# Health check
echo "1. Health Check"
echo "---------------"
test_endpoint "GET" "${BASE_URL}/health" "Health endpoint" 200
echo ""

# API root
echo "2. API Root"
echo "-----------"
test_endpoint "GET" "${API_URL}" "API root endpoint" 200
echo ""

# Public endpoints
echo "3. Public Endpoints"
echo "-------------------"
test_endpoint "GET" "${API_URL}/products" "Get products" 200
test_endpoint "GET" "${API_URL}/products/featured" "Get featured products" 200
test_endpoint "GET" "${API_URL}/categories" "Get categories" 200
test_endpoint "GET" "${API_URL}/vendors" "Get vendors" 200
echo ""

# Auth endpoints (should fail without credentials)
echo "4. Authentication (Expected Errors)"
echo "-----------------------------------"
test_endpoint "GET" "${API_URL}/auth/profile" "Get profile (no auth)" 401
test_endpoint "GET" "${API_URL}/orders" "Get orders (no auth)" 401
test_endpoint "GET" "${API_URL}/wishlist" "Get wishlist (no auth)" 401
echo ""

# 404 test
echo "5. Error Handling"
echo "-----------------"
test_endpoint "GET" "${API_URL}/nonexistent" "404 Not Found" 404
echo ""

# Summary
echo "================================="
echo "📊 Test Summary"
echo "================================="
echo -e "${GREEN}Passed: ${PASSED}${NC}"
echo -e "${RED}Failed: ${FAILED}${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo "Backend is working correctly! 🎉"
    exit 0
else
    echo -e "${RED}✗ Some tests failed${NC}"
    echo "Please check the backend logs for errors"
    exit 1
fi
