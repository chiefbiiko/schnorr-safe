import { secp256k1, schnorr } from "@noble/curves/secp256k1"

const _A = 0n
const _B = 7n
const _P = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn

/// Creates a new Schnorr keypair over secp256k1.
/// @return {{ secretKey: Uint8Array, publicKey: Uint8Array }} Key pair
export function keygen() {
  const secretKey = schnorr.utils.randomPrivateKey()
  console.log("✞✞✞✞✞ sk", secretKey)
  const publicKey = schnorr.getPublicKey(secretKey)
  console.log("✞✞✞✞✞ pk", publicKey)
  return { publicKey, secretKey }
}

/// Writes a signer's initial contribution consisting of pubkey and nonce
/// pubkey on-chain.
/// @param {Uint8Array} secretKey 32-byte secret key
/// @param {Uint8Array} msg keccak256 of the plaintext message
/// @return {{ publicKey: Uint8Array, noncePubKey: Uint8Array }} (Nonce) pubkey
export function computeNoncePubKey(secretKey, msg) {
  //TODO
}

/// Computes an individual signature.
/// @param {Uint8Array} secretKey 32-byte secret key
/// @param {Uint8Array} msg keccak256 of the plaintext message
/// @returns {{ signature: Uint8Array, commitment: Uint8Array }} Individual signature and commitment
export function computeSignature(noncePubKeys, secretKey, msg) {
  // // 4. Compute aggNoncePubKey.
  // LibSecp256k1.Point memory aggNoncePubKey;
  // aggNoncePubKey = aggregatePublicKeys(noncePubKeys);

  const aggNoncePubKey = null //TODO

  // // 5. Derive commitment from aggNoncePubKey.
  // address commitment = deriveCommitment(aggNoncePubKey);

  // // 6. Construct challenge.
  // bytes32 challenge = constructChallenge(aggPubKey, message, commitment);

  // // 7. Collect signatures from signers.
  // uint[] memory signatures = new uint[](privKeys.length);
  // for (uint i; i < privKeys.length; i++) {
  //     // 7.1 Derive secure nonce.
  //     uint nonce = deriveNonce(privKeys[i], message);

  //     // 7.2 Compute signature.
  //     signatures[i] = computeSignature(privKeys[i], nonce, challenge);
  // }
}

function derivePublicKey(sk) {
  //TODO
}

// function derivePublicKey(uint privKey)
//     internal
//     returns (LibSecp256k1.Point memory)
// {
//     Vm.Wallet memory wallet = vm.createWallet(privKey);

//     return LibSecp256k1.Point({x: wallet.publicKeyX, y: wallet.publicKeyY});

//     // Note that the public key can also be computed manually.
//     //
//     // Manual computation was used before forge-std supported public key
//     // derivation, see https://github.com/foundry-rs/foundry/issues/4790.
//     //
//     // Note that using the vm cheatcode increases the test suite's
//     // performance by ~5x.
//     //
//     // The code is kept as documentation. Note that all other functions in
//     // this library are now unused.
//     //
//     // Manual computation of public key:
//     //
//     // LibSecp256k1.JacobianPoint memory jacResult;
//     // jacResult = LibSecp256k1.G().toJacobian().mul(privKey);
//     //
//     // uint z = invMod(jacResult.z);
//     //
//     // return LibSecp256k1.Point({
//     //     x: mulmod(jacResult.x, z, P),
//     //     y: mulmod(jacResult.y, z, P)
//     // });
// }

// function deriveNonce(uint privKey, bytes32 message)
// internal
// pure
// returns (uint)
// {
// // k = H(x ‖ m) mod Q
// return uint(keccak256(abi.encodePacked(privKey, message)))
//     % LibSecp256k1.Q();
// }

// function computeNoncePublicKey(uint nonce)
// internal
// returns (LibSecp256k1.Point memory)
// {
// // R = [k]G
// return nonce.derivePublicKey();
// }

// function deriveCommitment(LibSecp256k1.Point memory noncePubKey)
// internal
// pure
// returns (address)
// {
// // Rₑ = Ethereum address of R.
// return noncePubKey.toAddress();
// }

// function constructChallenge(
// LibSecp256k1.Point memory pubKey,
// bytes32 message,
// address commitment
// ) internal pure returns (bytes32) {
// // e = H(Pₓ ‖ Pₚ ‖ m ‖ Rₑ) mod Q
// return bytes32(
//     uint(
//         keccak256(
//             abi.encodePacked(
//                 pubKey.x, uint8(pubKey.yParity()), message, commitment
//             )
//         )
//     ) % LibSecp256k1.Q()
// );
// }

// function computeSignature(uint privKey, uint nonce, bytes32 challenge)
// internal
// pure
// returns (uint)
// {
// // s = k + (e * x) (mod Q)
// return addmod(
//     nonce,
//     mulmod(uint(challenge), privKey, LibSecp256k1.Q()),
//     LibSecp256k1.Q()
// );
// }

// function aggregatePublicKeys(LibSecp256k1.Point[] memory pubKeys)
// internal
// pure
// returns (LibSecp256k1.Point memory)
// {
// // aggPubKey = sum(signers)
// //           = pubKey₁ + pubKey₂ + ... + pubKeyₙ
// require(pubKeys.length != 0);

// LibSecp256k1.JacobianPoint memory aggPubKey = pubKeys[0].toJacobian();

// for (uint i = 1; i < pubKeys.length; i++) {
//     aggPubKey.addAffinePoint(pubKeys[i]);
// }

// return aggPubKey.toAffine();
// }

function aggregatePublicKeys(pubKeys) {
  const aggPubKey = toJacobian(pubKeys[0])

  //TODO
  for (let i = 1; i < pubKeys.length; i++) {
    aggPubKey.addAffinePoint(pubKeys[i])
  }

  // return aggPubKey.toAffine();
}

function toJacobian(p) {
  return { x: p.x, y: p.y, z: 1n }
}

function toAffine(p) {
  //TODO
}

/// Computes the modulo.
/// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
function mod(x, p) {
  return ((x % p) + p) % p
}

function addmod(a, b, p) {
  return mod(a + b, p)
}

function mulmod(a, b, p) {
  return mod(a * b, p)
}

function addAffinePoint(jacobian, affine) {
  // Addition formula:
  //      x = r² - j - (2 * v)             (mod P)
  //      y = (r * (v - x)) - (2 * y1 * j) (mod P)
  //      z = (z1 + h)² - z1² - h²         (mod P)
  //
  // where:
  //      r = 2 * (s - y1) (mod P)
  //      j = h * i        (mod P)
  //      v = x1 * i       (mod P)
  //      h = u - x1       (mod P)
  //      s = y2 * z1³     (mod P)       Called s2 in reference
  //      i = 4 * h²       (mod P)
  //      u = x2 * z1²     (mod P)       Called u2 in reference
  //
  // and:
  //      x1 = self.x
  //      y1 = self.y
  //      z1 = self.z
  //      x2 = p.x
  //      y2 = p.y

  const out = { x: null, y: null, z: null }

  // Cache coordinates on stack.
  const x1 = jacobian.x
  const y1 = jacobian.y
  const z1 = jacobian.z

  // Compute z1_2 = z1²     (mod P)
  //              = z1 * z1 (mod P)
  const z1_2 = mulmod(z1, z1, _P)

  // Compute h = u        - x1       (mod P)
  //           = u        + (P - x1) (mod P)
  //           = x2 * z1² + (P - x1) (mod P)
  const h = addmod(mulmod(affine.x, z1_2, _P), _P - x1, _P)

  // Compute h_2 = h²    (mod P)
  //             = h * h (mod P)
  const h_2 = mulmod(h, h, _P)

  // Compute i = 4 * h² (mod P)
  const i = mulmod(4n, h_2, _P)

  // Compute z = (z1 + h)² - z1²       - h²       (mod P)
  //           = (z1 + h)² - z1²       + (P - h²) (mod P)
  //           = (z1 + h)² + (P - z1²) + (P - h²) (mod P)
  //             ╰───────╯   ╰───────╯   ╰──────╯
  //               left         mid       right
  { 
    const left = mulmod(addmod(z1, h, _P), addmod(z1, h, _P), _P)
    const mid = _P - z1_2
    const right = _P - h_2
    out.z = addmod(left, addmod(mid, right, _P), _P)
  }

  // Compute v = x1 * i (mod P)
  const v = mulmod(x1, i, _P)

  // Compute j = h * i (mod P)
  const j = mulmod(h, i, _P)

  // Compute r = 2 * (s               - y1)       (mod P)
  //           = 2 * (s               + (P - y1)) (mod P)
  //           = 2 * ((y2 * z1³)      + (P - y1)) (mod P)
  //           = 2 * ((y2 * z1² * z1) + (P - y1)) (mod P)
  const r = mulmod(
    2n,
    addmod(mulmod(affine.y, mulmod(z1_2, z1, _P), _P), _P - y1, _P),
    _P
  )

  // Compute x = r² - j - (2 * v)             (mod P)
  //           = r² - j + (P - (2 * v))       (mod P)
  //           = r² + (P - j) + (P - (2 * v)) (mod P)
  //                  ╰─────╯   ╰───────────╯
  //                    mid         right
  //
  // Unchecked because the only protected operations performed are
  // subtractions from P where the subtrahend is the result of a (mod P)
  // computation, i.e. the subtrahend being guaranteed to be less than P.
  {
    const r_2 = mulmod(r, r, _P)
    const mid = _P - j
    const right = _P - mulmod(2n, v, _P)
    out.x = addmod(r_2, addmod(mid, right, _P), _P)
  }

  // Compute y = (r * (v - x))       - (2 * y1 * j)       (mod P)
  //           = (r * (v - x))       + (P - (2 * y1 * j)) (mod P)
  //           = (r * (v + (P - x))) + (P - (2 * y1 * j)) (mod P)
  //             ╰─────────────────╯   ╰────────────────╯
  //                    left                 right
  //
  // Unchecked because the only protected operations performed are
  // subtractions from P where the subtrahend is the result of a (mod P)
  // computation, i.e. the subtrahend being guaranteed to be less than P.
  {
    const left = mulmod(r, addmod(v, _P - out.x, _P), _P)
    const right = _P - mulmod(2n, mulmod(y1, j, _P), _P)
    out.y = addmod(left, right, _P)
  }

  return out
}
