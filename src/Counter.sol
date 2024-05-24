// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "/lib/safe-smart-account/contracts/common/Enum.sol";

interface ISafe {
    function execTransactionFromModule(address to, uint256 value, bytes memory data, uint8 operation) external returns (bool success);
}

contract SchnorrModule {

    function verifySignature(bytes sig) internal pure returns (bool) {

        

        return false;
    }

    //  require(safe.execTransactionFromModule(token, 0, data, Enum.Operation.Call), "Could not execute token transfer");
}
