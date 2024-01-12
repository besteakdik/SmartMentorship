//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract userProfile {
    struct Mentor {
        address mentorAddress;
        string name;
        string expertise;
    }

    struct Student {
        address studentAddress;
        string name;
        string interest;
    }

    struct Match {
        address mentorAddress;
        address studentAddress;
        bool isMatched;
    }

    mapping(address => Mentor) public mentors; //mentors adında adress keyinden Mentor valuelarını işaret eden mappingler
    mapping(address => Student) public students;
    mapping(address => bool) public registered;
    mapping(address => Match) public matches;

    function registerAsMentor(string memory _name, string memory _expertise) public {
        require(!registered[msg.sender], "User already registered");

        Mentor storage mentor = mentors[msg.sender]; //msg.sender transaction'ı gönderen cüzdan adresi
        mentor.mentorAddress = msg.sender;
        mentor.name = _name;
        mentor.expertise = _expertise;
        registered[msg.sender] = true;
    }

    function registerAsStudent(string memory _name, string memory _interest) public {
        require(!registered[msg.sender], "User already registered");

        Student storage student = students[msg.sender];
        student.studentAddress = msg.sender;
        student.name = _name;
        student.interest = _interest;
        registered[msg.sender] = true;
    }

    function matchMentorStudent(address _mentorAddress) public {
        require(registered[msg.sender], "Student not registered.");
        require(mentors[_mentorAddress].mentorAddress != address(0),"Mentor not found");

        require(
            keccak256(bytes(students[msg.sender].interest)) ==
                keccak256(bytes(mentors[_mentorAddress].expertise)),
            "Interest and expertise do not match"
        ); // öğrencinin interestleriyle mentorların expertise'ları uyuyor mu

        matches[msg.sender] = Match(_mentorAddress, msg.sender, true); // öğrenci ve mentor arasındaki eşleşmeyi temsil eden yapı, true eşleşme olduğunu gösteriyor
        //msg.sender öğrencinin Ethereum adresi, bu mapping içinde öğrenciye ait eşleşme bilgilerini tutar
        //matches mappingine bu eşleşmeyi ekler
    }

    function getMtachInfo()public view returns (address, address, bool) {
        Match memory matchInfo = matches[msg.sender];
        return (matchInfo.mentorAddress, matchInfo.studentAddress, matchInfo.isMatched);
    }

    function isRegistered() public view returns (bool) {
        return registered[msg.sender];
    }
}
