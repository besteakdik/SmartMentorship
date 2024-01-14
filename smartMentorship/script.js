// connect to MetaMask
async function connectMetamask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            document.getElementById('accountArea').innerText = 'Connected Account: ' + accounts[0];
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('MetaMask not detected!');
    }
}


function matchMentorStudent() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const interest = document.getElementById('interest').value;

}

//2- connect to smart contract
const connectContract = async () => {
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_mentorAddress",
                    "type": "address"
                }
            ],
            "name": "matchMentorStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_expertise",
                    "type": "string"
                }
            ],
            "name": "registerAsMentor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_interest",
                    "type": "string"
                }
            ],
            "name": "registerAsStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMtachInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isRegistered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "matches",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "mentorAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "studentAddress",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "isMatched",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "mentors",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "mentorAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "expertise",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "registered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "students",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "studentAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "interest",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const Address = "0x59AC753A2F64779b65277724d06382B0af94Ba75";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "connected to smart contract";
}

//3-read data from smart contract
const readContract = async () => {
    const data = await window.contract.methods.isRegistered().call();
    document.getElementById("dataArea").innerHTML = data;
}


async function matchMentorStudent() { 
    try { 

        const mentorAddress = document.getElementById('mentorAddress').value; 

        if (!mentorAddress) { 
            console.error('Please enter the Mentor Address.'); 
            return; 
        } 
 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.matchMentorStudent(mentorAddress).send({ from: userAccount }); 
 
        // Log  
        console.log('Matching successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error matching Mentor and Student:', error.message); 
    } 
} 
async function registerAsStudent() { 
    try { 
        const studentName = document.getElementById('studentName').value; 
        const studentAddress = document.getElementById('studentAddress').value; 
        const studentInterest = document.getElementById('studentInterest').value; 
 
 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.registerAsStudent(studentName, studentAddress, studentInterest) 
            .send({ from: userAccount }); 
 
        console.log('Registration as Student successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error registering as Student:', error.message); 
    } 
} 
 
async function registerAsMentor() { 
    try { 

        const mentorName = document.getElementById('mentorName').value; 
        const mentorAddress = document.getElementById('mentorAddress').value; 
        const mentorExpertise = document.getElementById('mentorExpertise').value; 
 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.registerAsMentor(mentorName, mentorAddress, mentorExpertise) 
            .send({ from: userAccount }); 
 
        console.log('Registration as Mentor successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error registering as Mentor:', error.message); 
    } 
} 
async function approveAchievement() { 
    try { 
        const studentAddress = document.getElementById('studentAddress').value; 
        const achievementIndex = document.getElementById('achievementIndex').value; 
 
        if (!studentAddress || !achievementIndex) { 
            console.error('Please fill in all the achievement information fields.'); 
            return; 
        } 
 
        const accounts = await web3.eth.requestAccounts();
; 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.approveAchievement(studentAddress, achievementIndex) 
            .send({ from: userAccount }); 
 
        console.log('Achievement approval successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error approving achievement:', error.message); 
    } 
} 
async function createAssignment() { 
    try { 
        const assignmentLecture = document.getElementById('assignmentLecture').value; 
 
        if (!assignmentLecture) { 
            console.error('Please enter the assignment information.'); 
            return; 
        } 
 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.createAssignment(assignmentLecture) 
            .send({ from: userAccount }); 
 
        console.log('Assignment creation successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error creating assignment:', error.message); 
    } 
} 
 
async function updateAssignmentStatus() { 
    try { 
      
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
       
        const result = await smartContract.methods.updateAssignmentStatus(assignmentId, newStatus) 
            .send({ from: userAccount }); 

        console.log('Assignment status update successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error updating assignment status:', error.message); 
    } 
} 
async function createAchievement() { 
    try { 
        const achievementStudentAddress = document.getElementById('achievementStudentAddress').value; 
        const achievementDescription = document.getElementById('achievementDescription').value; 
 
        if (!achievementStudentAddress || !achievementDescription) { 
            console.error('Please fill in all the achievement information fields.'); 
            return; 
        } 
 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.createAchievement(achievementStudentAddress, achievementDescription) 
            .send({ from: userAccount }); 
 
        console.log('Achievement creation successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error creating achievement:', error.message); 
    } 
} 
 
async function updateAchievementStatus() { 
    try { 
        const achievementStudentAddress = document.getElementById('achievementStudentAddress').value; 
        const achievementIndex = document.getElementById('achievementIndex').value; 
        const newStatus = document.getElementById('newStatus').value; 

 
        const accounts = await web3.eth.requestAccounts(); 
        const userAccount = accounts[0]; 
 
        const result = await smartContract.methods.updateAchievementStatus(achievementStudentAddress, achievementIndex, newStatus) 
            .send({ from: userAccount }); 
 
        console.log('Achievement status update successful. Transaction hash:', result.transactionHash); 
    } catch (error) { 
        console.error('Error updating achievement status:', error.message); 
    } 
}

