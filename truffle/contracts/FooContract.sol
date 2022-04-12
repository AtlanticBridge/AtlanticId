// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";


contract FooContract is AccessControl {

    // address atlanticIdOwner;

    /** --- USER ROLES --- */
    bytes32 public constant ADMIN_ROLE    = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE   = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE   = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE   = keccak256("BURNER_ROLE");
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    constructor() {
        // _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        // _setupRole(PAUSER_ROLE, msg.sender);
        // _setupRole(BURNER_ROLE, msg.sender);
        // _setupRole(TRANSFER_ROLE, msg.sender);

        // atlanticIdOwner = msg.sender;
    }
}