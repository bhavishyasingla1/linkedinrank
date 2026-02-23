#!/bin/bash

# =============================================================================
# LinkedInRank Acceptance Tests Runner
# =============================================================================

set -e

echo "======================================"
echo "LinkedInRank Acceptance Tests"
echo "======================================"
echo ""

# Check if test PDF exists
TEST_PDF="${1:-./test-data/sample-linkedin.pdf}"
if [ ! -f "$TEST_PDF" ]; then
    echo "⚠️  Warning: Test PDF not found at $TEST_PDF"
    echo "   Using mock data for tests that don't require PDF"
    echo ""
fi

# ==========================================
# Test 1: Same input_hash across browsers
# ==========================================
echo "Test 1: Cross-browser input_hash consistency"
echo "---------------------------------------------"
echo "To verify: Upload same PDF via Chrome & Edge"
echo "Expected: input_hash identical, output JSON identical"
echo ""
echo "Manual test steps:"
echo "1. Start server: npm run dev"
echo "2. Open http://localhost:3000 in Chrome"
echo "3. Upload test PDF, note the input_hash from response"
echo "4. Open http://localhost:3000 in Edge"
echo "5. Upload same PDF, note the input_hash"
echo "6. Assert: Both input_hash values are identical"
echo ""

# ==========================================
# Test 2: Two-column PDF parsing
# ==========================================
echo "Test 2: Two-column PDF parsing"
echo "------------------------------"
echo "Verifies: LinkedIn two-column PDFs extract correctly"
echo ""
echo "Run: npx ts-node tests/acceptance/test_two_column_parsing.ts"
echo ""

# ==========================================
# Test 3: No manual UI (upload-only flow)
# ==========================================
echo "Test 3: No manual edit UI"
echo "-------------------------"
echo "Verifies: Public upload flow does not present editable form before scoring"
echo ""
echo "Manual test steps:"
echo "1. Navigate to homepage"
echo "2. Upload PDF"
echo "3. Assert: No editable text fields appear before results"
echo "4. Assert: User cannot modify profile data before scoring"
echo ""

# ==========================================
# Test 4: LLM cache
# ==========================================
echo "Test 4: LLM cache verification"
echo "------------------------------"
echo "Verifies: Second rewrite request served from cache"
echo ""
echo "Run: npx ts-node tests/acceptance/test_llm_cache.ts"
echo ""

# ==========================================
# Test 5: Score determinism (50 iterations)
# ==========================================
echo "Test 5: Score determinism"
echo "-------------------------"
echo "Verifies: Same PDF produces identical score across 50 iterations"
echo ""
echo "Run: npx ts-node tests/acceptance/test_score_determinism.ts $TEST_PDF"
echo ""

# ==========================================
# Summary
# ==========================================
echo "======================================"
echo "Test Summary"
echo "======================================"
echo ""
echo "Automated tests (run with npx ts-node):"
echo "  - test_score_determinism.ts"
echo "  - test_two_column_parsing.ts"
echo "  - test_llm_cache.ts"
echo ""
echo "Manual tests (require browser):"
echo "  - Cross-browser input_hash consistency"
echo "  - No manual edit UI verification"
echo ""
echo "To run all TypeScript tests:"
echo "  npx ts-node tests/acceptance/test_score_determinism.ts"
echo "  npx ts-node tests/acceptance/test_two_column_parsing.ts"
echo "  npx ts-node tests/acceptance/test_llm_cache.ts"
echo ""
