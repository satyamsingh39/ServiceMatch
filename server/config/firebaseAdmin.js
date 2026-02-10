// // server/config/firebaseAdmin.js
// import admin from "firebase-admin";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const serviceAccount = require("../serviceAccountKey.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export default admin;

import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Use a try-catch to handle missing service account file gracefully
let serviceAccount;
try {
  serviceAccount = require("../servicematch-6dfed-firebase-adminsdk-fbsvc-48ce9a35ae.json");
} catch (error) {
  console.error("❌ Firebase Service Account not found. Check config/firebaseAdmin.js");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin Initialized");
}

export default admin;
