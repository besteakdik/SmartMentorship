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

    // modifier onlyMentor() {
    //     require(userProfileCont.mentors[msg.sender].mentorAddress != address(0), "Not authorized");
    //     _;
    // }

    // modifier onlyMatchedMentor() {
    //     (address mentorAddress, address studentAddress , bool isMatched) = userProfile.getMatchInfo();
    //     require(isMatched && msg.sender == mentorAddress, "Not authorized");
    //     _;
    // }

    constructor(address _userProfileAddress) {
        userProfileContract = userProfile(_userProfileAddress);
    }

    function createAssignment(string memory _description, address _studentAddress) public  {
        assignmentCount++;
        Assignment storage newAssignment = assignments[assignmentCount];
        newAssignment.assignmentId = assignmentCount;
        newAssignment.mentorAddress = msg.sender;
        newAssignment.studentAddress = _studentAddress;
        newAssignment.description = _description;
        newAssignment.status = AssignmentStatus.Pending;

        emit AssignmentCreated(assignmentCount, msg.sender, newAssignment.studentAddress, _description);
    }

    function updateAssignmentStatus(uint256 _assignmentId, AssignmentStatus _status) public {
        require(assignments[_assignmentId].mentorAddress == msg.sender, "Not authorized");
        require(assignments[_assignmentId].status == AssignmentStatus.Pending, "Assignment status cannot be updated");

        assignments[_assignmentId].status = _status;
        emit AssignmentStatusUpdated(_assignmentId, _status);
    }

    function getAssignment(uint256 _assignmentId) public view returns (Assignment memory) {
        return assignments[_assignmentId];
    }





}