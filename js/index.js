
    // /// @dev Returns a Schnorr signature of type (signature, commitment) signing
    // ///      `message` via `privKey`.
    // function signMessage(uint privKey, bytes32 message)
    //     internal
    //     returns (uint, address)
    // {
    //     LibSecp256k1.Point memory pubKey = privKey.derivePublicKey();

    //     // 1. Select secure nonce.
    //     uint nonce = deriveNonce(privKey, message);

    //     // 2. Compute noncePubKey.
    //     LibSecp256k1.Point memory noncePubKey = computeNoncePublicKey(nonce);

    //     // 3. Derive commitment from noncePubKey.
    //     address commitment = deriveCommitment(noncePubKey);

    //     // 4. Construct challenge.
    //     bytes32 challenge = constructChallenge(pubKey, message, commitment);

    //     // 5. Compute signature.
    //     uint signature = computeSignature(privKey, nonce, challenge);

    //     // BONUS: Make sure signature can be verified.
    //     bool ok =
    //         verifySignature(pubKey, message, bytes32(signature), commitment);
    //     if (!ok) {
    //         console2.log(
    //             StdStyle.red(
    //                 "[INTERNAL ERROR] LibSchnorrExtended: could not verify own signature"
    //             )
    //         );
    //     }

    //     // => The public key signs the message via the signature and
    //     //    commitment.
    //     return (signature, commitment);
    // }

/// Signs given message using the Schnorr signature algorithm.
/// @param sk 32-byte secret key
/// @param msg keccak256 of the plaintext message
export async function signSchnorr(sk, msg) {

}