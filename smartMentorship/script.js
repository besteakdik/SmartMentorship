// script.js

// Function to connect to MetaMask
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

// Function to connect to contract
// Function to connect to contract using web3.jsasync function connectContract() {


// Function to add a student to lecture
function addStudentToLecture() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const address = document.getElementById('address').value;
    const interest = document.getElementById('interest').value;

    // Implement adding a student to lecture logic here
    // Example: You might update the UI or send data to the server
}

// Function to update student information
function updateStudentInfo() {
    // Implement updating student information logic here
}

// Function to create a lecture or achievement
function createLecture() {
    const lectureInput = document.getElementById('lecture').value;

    // Implement creating a lecture or achievement logic here
    // Example: You might update the UI or send data to the server
}

// Function to show delete input container
function showDeleteInput() {
    // Implement showing delete input container logic here
}

// Function to delete lecture or achievement by name
function deleteLectureByName() {
    // Implement deleting lecture or achievement by name logic here
}

// You may add more functions based on your requirements.
