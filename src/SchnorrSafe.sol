// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Enum } from "safe-smart-account/contracts/common/Enum.sol";
import { LibSchnorr } from "scribe/src/libs/LibSchnorr.sol";

interface ISafe {
    function execTransactionFromModule(address to, uint256 value, bytes memory data, uint8 operation) external returns (bool success);
}

contract SchnorrSafe {

    function verifySignature(
        LibSecp256k1.Point memory aggPubKey,
        bytes32 message,
        bytes32 signature,
        address commitment
    ) internal pure returns (bool valid) {
        return LibSchnorr.verifySignature(aggPubKey, message, signature, commitment);
    }

    function exec(
         address to, uint256 value, bytes memory data, uint8 operation,
        LibSecp256k1.Point memory aggPubKey,  bytes32 message,    bytes32 signature,   address commitment
    )  external returns (bool success) {
        //TODO extract number of signatories from aggPubkey or whatever 0>
        // to make sure it is gte the Safe#s threshold
    }

    //  require(safe.execTransactionFromModule(token, 0, data, Enum.Operation.Call), "Could not execute token transfer");
}
