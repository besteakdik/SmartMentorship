// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract hiringCommunity {
    address public admin; //community yöneticisi, üyesi
    mapping (address => bool) public qualifiedMentors; //nitelikli mentorlar

    event MentorHired(address indexed mentorAddress);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized"); //adminle kontrat sahibi aynı mı, sadece adminlerin yapabileceği işler
        _;
    }

    modifier onlyQualifiedMentor() { //sadece nitelikli mentorlerin yapabileceği işlemler
        require(qualifiedMentors[msg.sender], "Not a qualified mentor");
        _;
    }

    constructor() {
        admin = msg.sender; //sözleşmeyi çalıştıran kişi admin ataması, sözleşme oluştuğu anda çalışır
    }

    function hireMentor(address _mentorAddress) public onlyAdmin {
        qualifiedMentors[_mentorAddress] = true;
        emit MentorHired(_mentorAddress);
    }


    function checkMentorQualification(address _mentorAddress) public view returns (bool) {
        return qualifiedMentors[_mentorAddress]; //mentor nitelikli mi kontrolü
    }

    function performQualifiedTask() public onlyQualifiedMentor { // sadece niteliklilerin yapabileceği işlevler
        // islev yazılabilir
    }

}