//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./userProfile.sol";

contract studentAchievements {

    userProfile userProfileContract; //userProfile sözleşmesine erişim

    constructor(address _userProfileAddress) {
        userProfileContract = userProfile(_userProfileAddress); // başta bir kereliğine çalışır. iki sözleşmeyi adres üzerinden bağlamak için.
    }

    // modifier onlyMatchedMentor() {
    //     require(userProfileContract.getMatchInfo()[2] && msg.sender == userProfileContract.getMatchInfo()[0], "Not authorized");
    //     _;
    // }

    modifier onlyMatchedMentor() {
        (address mentorAddress, , bool isMatched) = userProfileContract.getMatchInfo(); //userProfile'dan bilgileri alıp eşleşip eşleşmediğine bakıcaz
        require(isMatched && msg.sender == mentorAddress, "Not authorized"); //eğer eşleşme varsa ve sözleşmeyi çağıran ve mentor adresi aynıysa, değilse not auth
        _; //koşullar sağlandığında fonksiyonun geri kalanı çalışsın
    }

    struct Achievement {
        string description; // başarının açıklaması
        bool isApproved;    // mentor tarafından onaylanıp onaylanmaması/onay durumu
    }  

    mapping(address => Achievement[]) public studentAchievementsList; //bir öğrencinin birden çok başarısı olabilir. adrese karşılık bir dizi achievement

    event AchievementRecorded(address indexed studentAddress, string description);
    event AchievementApproved(address indexed mentorAddress, address indexed studentAddress, uint256 achievementIndex);

    function recordAchievement(address _studentAddress, string memory _description) public onlyMatchedMentor {
        studentAchievementsList[_studentAddress].push(Achievement(_description, false));
        emit AchievementRecorded(_studentAddress, _description);
    }

    function approveAchievement(address _studentAddress, uint256 _achievementIndex) public onlyMatchedMentor {
        require(_achievementIndex < studentAchievementsList[_studentAddress].length, "Invalid achievement index");
        require(!studentAchievementsList[_studentAddress][_achievementIndex].isApproved, "Achievement already approved");

        studentAchievementsList[_studentAddress][_achievementIndex].isApproved = true;
        emit AchievementApproved(msg.sender, _studentAddress, _achievementIndex);
    }


    function getStudentAchievementsList(address _studentAddress) public view returns (Achievement[] memory) {
        return studentAchievementsList[_studentAddress];  //öğrencinin tüm başarılarının görüntülenmesi
    }


}

