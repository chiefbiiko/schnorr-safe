// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Enum } from "safe-smart-account/contracts/common/Enum.sol";
import { ModuleManager, OwnerManager } from "safe-smart-account/contracts/base/ModuleManager.sol";
import { LibSchnorr } from "scribe/src/libs/LibSchnorr.sol";
import { LibSchnorrExtended } from "scribe/script/libs/LibSchnorrExtended.sol";

contract SchnorrSafe {
    using LibSchnorrExtended for LibSecp256k1.Point[];

    /// Writes a signer's initial contribution consisting of pubkey and nonce 
    /// pubkey on-chain.
    function contributePubKeys() {

    }

    function contributeSignature() {

    }

    function execute(
        address safe,
         address to, uint256 value, bytes memory data, uint8 operation,
        LibSecp256k1.Point[] memory pubKeys,  bytes32 message,    bytes32 signature,   address commitment
    )  external returns (bool success) {
        // Make sure number of public keys is gte threshold
        require(pubKeys.length >= OwnerManager(safe).getThreshold());

        // Make sure each pubKey belongs to a distinct Safe owner
        address[] memory owners = OwnerManager(safe).getOwners();
        for (uint i = 0; i < pubKeys.length; i++) {
            address adrs =  pubKeys[i].toAddress();
            int ownerIndex = -1;
            for (uint j = 0; j < owners.length; j++) {
                if (address(owners[j]) != address(0) && adrs == address(owners[j])) {
                    ownerIndex = j;
                    break;
                }
            }

            // Must be an owner
            require(ownerIndex != -1); //TODO proper err

            // Prevents double signing
            delete owners[ownerIndex];
        }

        // Verify Schnorr signature
        LibSecp256k1.Point memory aggPubKey = pubKeys.aggregatePublicKeys();
        require(LibSchnorr.verifySignature(aggPubKey, message, signature, commitment)); //TODO proper err

        // Dispatch Safe transaction
        require(ModuleManager(safe).execTransactionFromModule(to, value, data, operation)); //TODO proper err
    }
}
