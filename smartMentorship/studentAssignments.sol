// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./userProfile.sol";

contract studentAssignments {

    userProfile userProfileContract; ////userProfile sözleşmesine erişiriz

    enum AssignmentStatus {Pending, Approved, Rejected} //ödevlerin durumları (bekleme,kabul,red) enum:sıralı tür, belli değerler alan sınırlı küme

    struct Assignment {
        uint256 assignmentId;
        address mentorAddress;
        address studentAddress;
        string description;
        AssignmentStatus status;
    }

    mapping (uint256 => Assignment) public assignments;
    uint256 public assignmentCount;

    event AssignmentCreated(uint256 assignmentId, address mentorAddress, address studentAddress, string description);
    event AssignmentStatusUpdated(uint256 assignmentId, AssignmentStatus status);

}