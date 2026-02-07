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

const serviceAccount = require("../servicematch-6dfed-firebase-adminsdk-fbsvc-48ce9a35ae.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
