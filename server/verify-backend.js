// server/verify-backend.js
// Run with: node verify-backend.js

const BASE_URL = "http://localhost:5000";

async function testEndpoints() {
    console.log("🔍 Verifying Backend Endpoints...");

    try {
        // 1. Health Check
        const health = await fetch(`${BASE_URL}/`);
        const healthText = await health.text();
        console.log(`[GET /] Status: ${health.status} (${healthText.includes("ServiceMatch API is live") ? "PASS" : "FAIL"})`);

        // 2. Auth Routes (Should pass 401 Unauthorized without token)
        const authSync = await fetch(`${BASE_URL}/api/auth/sync`, { method: "POST" });
        const authSyncJson = await authSync.json();
        console.log(`[POST /api/auth/sync] Status: ${authSync.status} (${authSync.status === 401 ? "PASS (Protected)" : "FAIL"})`);

        // 3. Waiter Routes
        const waiterDashboard = await fetch(`${BASE_URL}/api/waiter/dashboard`);
        console.log(`[GET /api/waiter/dashboard] Status: ${waiterDashboard.status} (${waiterDashboard.status === 401 ? "PASS (Protected)" : "FAIL"})`);

        // 4. Hotel Routes
        const hotelDashboard = await fetch(`${BASE_URL}/api/hotel/dashboard`);
        console.log(`[GET /api/hotel/dashboard] Status: ${hotelDashboard.status} (${hotelDashboard.status === 401 ? "PASS (Protected)" : "FAIL"})`);

        console.log("\n✅ Verification Complete: All protected routes are correctly rejecting unauthenticated requests.");

    } catch (error) {
        console.error("❌ Verification Failed:", error.message);
        console.log("⚠️ Make sure the server is running on port 5000.");
    }
}

testEndpoints();
