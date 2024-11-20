var playersData = [];
let filteredPlayers = [];
var form = document.getElementById('playerForm');
function validateForm() {
    var name = document.getElementById('name').value.trim();
    var age = document.getElementById('age').value.trim();
    var gender = document.getElementById('gender').value.trim();
    var sportsType = document.getElementById('SportsType').value.trim();
    var sports = document.getElementById('Sports').value.trim();
    var profilePhoto = document.getElementById('profile_photo').value.trim();
    
    var nameError = document.getElementById('nameError');
    var ageError = document.getElementById('ageError');
    var genderError = document.getElementById('genderError');
    var sportsTypeError = document.getElementById('sportsTypeError');
    var sportsError = document.getElementById('sportsError');
    var profilePhotoError = document.getElementById('profilePhotoError');

    nameError.textContent = '';
    ageError.textContent = '';
    genderError.textContent = '';
    sportsTypeError.textContent = '';
    sportsError.textContent = '';
    profilePhotoError.textContent = '';

    var isValid = true;

    if (!name) {
        nameError.textContent = 'Name is required.';
        isValid = false;
    }

    if (!age) {
        ageError.textContent = 'Age is required.';
        isValid = false;
    }

    if (!gender) {
        genderError.textContent = 'Gender is required.';
        isValid = false;
    }

    if (!sportsType) {
        sportsTypeError.textContent = 'Sports Type is required.';
        isValid = false;
    }
    console.log(sports);
    if (!sports) {
    
           sportsError.textContent = 'Sports is required.';
           isValid = false;
    }

    if (!profilePhoto) {
        profilePhotoError.textContent = 'Profile Photo is required.';
        isValid = false;
    }
    if (!document.getElementById('playerForm').hasAttribute('data-editing-index')) {
                var duplicateNames = playersData.some(function(player) {
                    return player.name.toLowerCase() === name.toLowerCase();
                });
        
                if (duplicateNames) {
                    alert('Name must be unique.');
                    isValid = false;
                }
           }
        
             return isValid;
         }
   

function addOption(selectElement, optionText) {
    var option = document.createElement('option');
    option.text = optionText;
    option.value = optionText.toLowerCase();
    selectElement.add(option);
}

function updateSportsOptions() {
    var sportsType = document.getElementById('SportsType').value.trim();
    var sportsDropdown = document.getElementById('Sports');
    sportsDropdown.disabled = (sportsType === "");

    sportsDropdown.innerHTML = '';

    if (sportsType === 'indoor') {
        addOption(sportsDropdown, 'Select a game');
        addOption(sportsDropdown, 'Chess');
        addOption(sportsDropdown, 'Carrom');
        addOption(sportsDropdown, 'Table Tennis');
        addOption(sportsDropdown, 'Badminton');
    } else if (sportsType === 'outdoor') {
        addOption(sportsDropdown, 'Select a game');
        addOption(sportsDropdown, 'Cricket');
        addOption(sportsDropdown, 'Hockey');
        addOption(sportsDropdown, 'Tennis');
        addOption(sportsDropdown, 'Baseball');
    }
}

function filterPlayers() {
    var searchText = document.getElementById('search_by_name').value.trim().toLowerCase();
    var selectedOption = document.getElementById('search_filter').value.toLowerCase();
        filteredPlayers = playersData.filter(function(player) {
        var nameMatch = player.name.toLowerCase().includes(searchText);
        var optionMatch = selectedOption === 'all' || player.sportsType.toLowerCase() === selectedOption;
        return nameMatch && optionMatch;
        
    });

    displayPlayerDetails(filteredPlayers);
}

function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        var name = document.getElementById('name').value.trim();
        var age = document.getElementById('age').value.trim();
        var gender = document.getElementById('gender').value.trim();
        var sportsType = document.getElementById('SportsType').value.trim();
        var sports = document.getElementById('Sports').value.trim();
        var profilePhoto = document.getElementById('profile_photo').files[0];

        var editingIndex = document.getElementById('playerForm').dataset.editingIndex;

        if (editingIndex !== undefined) {
            playersData[editingIndex] = {
                name: name,
                age: age,
                gender: gender,
                sportsType: sportsType,
                sports: sports,
                profilePhoto: profilePhoto
            };
            document.getElementById('playerForm').removeAttribute('data-editing-index');
        } else {
            playersData.push({
                name: name,
                age: age,
                gender: gender,
                sportsType: sportsType,
                sports: sports,
                profilePhoto: profilePhoto

            });
        }
        form.reset();
         let searchText = document.getElementById('search_by_name').value.trim().toLowerCase();
         let selectedOption = document.getElementById('search_filter').value.toLowerCase();
         if(searchText!=""||selectedOption!='all'){
        
            filterPlayers();
         }
         else
         {
         displayPlayerDetails(playersData);
         }
    }
    
}

function editPlayer(index) {
    var player = filteredPlayers.length ? filteredPlayers[index] : playersData[index];
    var originalIndex = playersData.indexOf(player);

    document.getElementById('name').value = player.name;
    document.getElementById('age').value = player.age;
    document.getElementById('gender').value = player.gender;
    document.getElementById('SportsType').value = player.sportsType;
    updateSportsOptions();
    document.getElementById('Sports').value = player.sports;
    document.getElementById('playerForm').setAttribute('data-editing-index', originalIndex);
    errorMessage();
}

function deletePlayer(index) {
    var confirmDelete = confirm('Are you sure you want to delete this player?');
    if (confirmDelete) {
        playersData.splice(index, 1);
        displayPlayerDetails(filteredPlayers.length ? filteredPlayers : playersData);
    }
}

function displayPlayerDetails(players) {
    var outputElement = document.getElementById('output1');
    outputElement.innerHTML = '';

    players.forEach(function(player, index) {
        var playerElement = document.createElement('div');
        playerElement.classList.add('player');

        var profilePhotoElement = document.createElement('img');
        profilePhotoElement.src = player.profilePhoto ? URL.createObjectURL(player.profilePhoto) : 'placeholder_image_url';
        profilePhotoElement.alt = player.name + ' Profile Photo';
        profilePhotoElement.classList.add('profile-photo');
        playerElement.appendChild(profilePhotoElement);

        var userDataElement = document.createElement('div');
        
        userDataElement.classList.add('user-data');
        userDataElement.innerHTML = `
            <h3>Name: ${player.name}</h3>
            <h3>Age: ${player.age}</h3>
            <h3>Gender: ${player.gender}</h3>
            <h3>Sportstype: ${player.sportsType}</h3>
            <h3>Sports: ${player.sports}</h3>
        `;
        playerElement.appendChild(userDataElement);

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        var editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.addEventListener('click', function() {
            editPlayer(index);
        });
        editButton.classList.add('edit-button');
        buttonContainer.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function() {
            deletePlayer(index);
        });
        deleteButton.classList.add('delete-button');
        buttonContainer.appendChild(deleteButton);

        playerElement.appendChild(buttonContainer);
        outputElement.appendChild(playerElement);
    });
form.reset();
}

document.getElementById('name').addEventListener('input', function() {
    document.getElementById('nameError').textContent = '';
});

document.getElementById('age').addEventListener('input', function() {
    document.getElementById('ageError').textContent = '';
});

document.getElementById('gender').addEventListener('input', function() {
    document.getElementById('genderError').textContent = '';
});

document.getElementById('SportsType').addEventListener('input', function() {
    document.getElementById('sportsTypeError').textContent = '';
    updateSportsOptions();
});

document.getElementById('Sports').addEventListener('input', function() {
    document.getElementById('sportsError').textContent = '';
});

document.getElementById('profile_photo').addEventListener('input', function() {
    document.getElementById('profilePhotoError').textContent = '';
});

document.getElementById('search_by_name').addEventListener('input', filterPlayers);
document.getElementById('search_filter').addEventListener('change', filterPlayers);

document.getElementById('playerForm').addEventListener('submit', handleSubmit);


let errorMessage = () =>
{
    nameError.textContent = "";
    ageError.textContent = "";
    genderError.textContent = "";
    sportsTypeError.textContent="";
    sportsError.textContent="";
}



