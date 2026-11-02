// Automated Endpoint Verification Test Suite using Supertest
import request from 'supertest';
import app from './app.js';

async function runTestSuite() {
  console.log(`[Test Suite] Beginning in-process verification of all 15 endpoints...\n`);

  const tests = [
    { name: 'GET /api/health (Service Status)', path: '/api/health', expectedStatus: 200, isHealth: true },
    { name: 'GET /api/districts (Master District List)', path: '/api/districts', expectedStatus: 200 },
    { name: 'GET /api/districts/pune (Single District Valid)', path: '/api/districts/pune', expectedStatus: 200 },
    { name: 'GET /api/districts/invalid-xyz (Single District 404)', path: '/api/districts/invalid-xyz', expectedStatus: 404 },
    { name: 'GET /api/education (All Education Data)', path: '/api/education', expectedStatus: 200 },
    { name: 'GET /api/education/summary (Statewide Summary)', path: '/api/education/summary', expectedStatus: 200 },
    { name: 'GET /api/education/pune (District Education Data)', path: '/api/education/pune', expectedStatus: 200 },
    { name: 'GET /api/healthcare (All Healthcare Data)', path: '/api/healthcare', expectedStatus: 200 },
    { name: 'GET /api/healthcare/facilities (GIS Facilities)', path: '/api/healthcare/facilities', expectedStatus: 200 },
    { name: 'GET /api/healthcare/pune (District Healthcare Data)', path: '/api/healthcare/pune', expectedStatus: 200 },
    { name: 'GET /api/water (All Water Data)', path: '/api/water', expectedStatus: 200 },
    { name: 'GET /api/water/summary (Statewide Water Summary)', path: '/api/water/summary', expectedStatus: 200 },
    { name: 'GET /api/water/pune (District Water Data)', path: '/api/water/pune', expectedStatus: 200 },
    { name: 'GET /api/analytics/dashboard (State KPI Cards)', path: '/api/analytics/dashboard', expectedStatus: 200 },
    { name: 'GET /api/analytics/district-comparison (Comparisons)', path: '/api/analytics/district-comparison', expectedStatus: 200 },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const res = await request(app).get(t.path);
      const isStatusOk = res.status === t.expectedStatus;
      const isEnvelopeOk = t.isHealth
        ? res.body.status === 'UP'
        : res.status === 404
        ? res.body.success === false
        : res.body.success === true && res.body.meta?.dataStatus === 'PLACEHOLDER';

      if (isStatusOk && isEnvelopeOk) {
        console.log(`  PASS: [${res.status}] ${t.name}`);
        passed++;
      } else {
        console.error(`  FAIL: [Expected ${t.expectedStatus}, got ${res.status}] ${t.name}`);
        if (res.body) console.error(`    Body:`, JSON.stringify(res.body));
        failed++;
      }
    } catch (err) {
      console.error(`  ERROR on ${t.name}:`, err.message);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTestSuite();
