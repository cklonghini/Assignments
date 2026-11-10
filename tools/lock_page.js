#!/usr/bin/env node
/*
  Locks the home page's assignment list with a password. build_index.py runs this for you when the INDEX_PASSWORD
  environment variable is set (the teacher adds it once in the cloud environment's settings). Never put the password
  in the repository.

    echo '<html to lock>' | INDEX_PASSWORD=... node tools/lock_page.js

  Prints {"iv": "...", "ct": "..."}: the list encrypted with AES-GCM, using a key made from the password with PBKDF2
  (SHA-256, 250,000 rounds). The page asks for the password and unlocks the list in the browser with the same steps,
  so the list (and its links) is not readable in the page source. The salt stays the same from build to build, so a
  computer that chose "Remember this computer" stays unlocked after the page is rebuilt.
*/
const { webcrypto } = require('crypto');
const subtle = webcrypto.subtle;
const SALT = 'eaa-assignments-index-v1', ROUNDS = 250000;
(async () => {
  const pw = process.env.INDEX_PASSWORD || '';
  if (!pw) { console.error('INDEX_PASSWORD is not set'); process.exit(2); }
  let html = ''; for await (const chunk of process.stdin) html += chunk;
  const base = await subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await subtle.deriveKey({ name: 'PBKDF2', salt: new TextEncoder().encode(SALT), iterations: ROUNDS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(html)));
  const b64 = a => Buffer.from(a).toString('base64');
  process.stdout.write(JSON.stringify({ iv: b64(iv), ct: b64(ct), salt: SALT, rounds: ROUNDS }));
})();
