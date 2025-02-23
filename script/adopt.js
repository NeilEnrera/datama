// Sample pet data
const petsData = [
    // Stray Dogs (5)
    {
        id: 1,
        name: "Max",
        type: "strayDogs",
        image: "image/golden.jpg",
        description: "Friendly and sweet stray dog",
        species: "Dog",
        breed: "Golden Retriever",
        age: "1 year 5 months",
        gender: "Male",
        size: "Large"
    },
    {
        id: 2,
        name: "Rocky",
        type: "strayDogs",
        image: "image/rocky.jpg",
        description: "Energetic and playful stray dog",
        species: "Dog",
        breed: "German Shepherd",
        age: "2 years",
        gender: "Male",
        size: "Large"
    },
    {
        id: 3,
        name: "Bella",
        type: "strayDogs",
        image: "image/bella.jpg",
        description: "Shy but friendly stray dog",
        species: "Dog",
        breed: "Bulldog",
        age: "1 year 3 months",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 4,
        name: "Sam",
        type: "strayDogs",
        image: "image/sam.jpg",
        description: "Protective and alert stray dog",
        species: "Dog",
        breed: "Doberman",
        age: "2.5 years",
        gender: "Male",
        size: "Large"
    },
    {
        id: 5,
        name: "Daisy",
        type: "strayDogs",
        image: "image/daisy.jpg",
        description: "Calm and caring stray dog",
        species: "Dog",
        breed: "Shih Tzu",
        age: "3 years",
        gender: "Female",
        size: "Small"
    },

    // Stray Cats (5)
    {
        id: 6,
        name: "Luna",
        type: "strayCats",
        image: "image/luna.jpg",
        description: "Gentle and loving stray cat",
        species: "Cat",
        breed: "Persian Mix",
        age: "8 months",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 7,
        name: "Milo",
        type: "strayCats",
        image: "image/milo.jpg",
        description: "Sweet and cuddly stray cat",
        species: "Cat",
        breed: "Domestic Shorthair",
        age: "1 year",
        gender: "Male",
        size: "Medium"
    },
    {
        id: 8,
        name: "Shadow",
        type: "strayCats",
        image: "image/shadow.jpg",
        description: "Mysterious and quiet stray cat",
        species: "Cat",
        breed: "Bombay",
        age: "2 years",
        gender: "Female",
        size: "Small"
    },
    {
        id: 9,
        name: "Oliver",
        type: "strayCats",
        image: "image/oliver.jpg",
        description: "Active and playful stray cat",
        species: "Cat",
        breed: "Maine Coon",
        age: "1 year 4 months",
        gender: "Male",
        size: "Large"
    },
    {
        id: 10,
        name: "Whiskers",
        type: "strayCats",
        image: "image/whiskers.jpg",
        description: "Adventurous and curious stray cat",
        species: "Cat",
        breed: "Sphynx",
        age: "9 months",
        gender: "Male",
        size: "Small"
    },

    // Lost Dogs (5)
    {
        id: 11,
        name: "Buddy",
        type: "lostDogs",
        image: "image/buddy.jpg",
        description: "Lost family dog, very friendly",
        species: "Dog",
        breed: "Labrador",
        age: "3 years",
        gender: "Male",
        size: "Large"
    },
    {
        id: 12,
        name: "Max",
        type: "lostDogs",
        image: "image/max.jpg",
        description: "Lost dog, needs his family",
        species: "Dog",
        breed: "Beagle",
        age: "2 years",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 13,
        name: "Charlie",
        type: "lostDogs",
        image: "image/charlie.jpg",
        description: "Lost dog, responds well to treats",
        species: "Dog",
        breed: "Poodle",
        age: "1.5 years",
        gender: "Male",
        size: "Medium"
    },
    {
        id: 14,
        name: "Maggie",
        type: "lostDogs",
        image: "image/maggie.jpg",
        description: "Missing dog, shy but friendly",
        species: "Dog",
        breed: "Cocker Spaniel",
        age: "4 years",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 15,
        name: "Cooper",
        type: "lostDogs",
        image: "image/cooper.jpg",
        description: "Lost family dog, loves to play",
        species: "Dog",
        breed: "Boxer",
        age: "2 years 6 months",
        gender: "Male",
        size: "Large"
    },

    // Lost Cats (5)
    {
        id: 16,
        name: "Oliver",
        type: "lostCats",
        image: "image/oliver.jpg",
        description: "Lost indoor cat, very shy",
        species: "Cat",
        breed: "Maine Coon",
        age: "1.5 years",
        gender: "Male",
        size: "Large"
    },
    {
        id: 17,
        name: "Bella",
        type: "lostCats",
        image: "image/bella.jpg",
        description: "Lost cat, misses home",
        species: "Cat",
        breed: "Siamese",
        age: "2 years",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 18,
        name: "Mittens",
        type: "lostCats",
        image: "image/mittens.jpg",
        description: "Missing cat, very affectionate",
        species: "Cat",
        breed: "Ragdoll",
        age: "3 years",
        gender: "Female",
        size: "Medium"
    },
    {
        id: 19,
        name: "Leo",
        type: "lostCats",
        image: "image/leo.jpg",
        description: "Lost cat, last seen near park",
        species: "Cat",
        breed: "Burmese",
        age: "1 year 2 months",
        gender: "Male",
        size: "Small"
    },
    {
        id: 20,
        name: "Sophie",
        type: "lostCats",
        image: "image/sophie.jpg",
        description: "Missing indoor cat, loves attention",
        species: "Cat",
        breed: "Bengal",
        age: "4 years",
        gender: "Female",
        size: "Small"
    }
];


// Get DOM elements
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const petsContainer = document.getElementById('lostDogsContainer');

// Function to create pet cards
function createPetCard(pet) {
    return `
        <div class="pet-frame" onclick="showPetDetails(${pet.id})">
            <div class="pet-image-container">
                <img src="${pet.image}" alt="${pet.name}">
            </div>
            <div class="pet-info">
                <h2>${pet.name}</h2>
                <p class="pet-description">${pet.description}</p>
            </div>
        </div>
    `;
}

// Function to filter and display pets
function displayPets() {
    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);

    const petsToShow = selectedCategories.length === 0 
        ? petsData 
        : petsData.filter(pet => selectedCategories.includes(pet.type));

    petsContainer.innerHTML = petsToShow
        .map(pet => createPetCard(pet))
        .join('');
}

// Function to show pet details popup
function showPetDetails(petId) {
    const pet = petsData.find(p => p.id === petId);
    
    const popup = document.createElement('div');
    popup.className = 'pet-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            <div class="pet-detail-card">
                <div class="pet-image-container">
                    <img src="${pet.image}" alt="${pet.name}">
                </div>
                <div class="pet-info">
                    <h2>${pet.name}</h2>
                    <table class="details-table">
                        <tr>
                            <td>Species</td>
                            <td>${pet.species}</td>
                        </tr>
                        <tr>
                            <td>Breed</td>
                            <td>${pet.breed}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>${pet.age}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>${pet.gender}</td>
                        </tr>
                        <tr>
                            <td>Size</td>
                            <td>${pet.size}</td>
                        </tr>
                    </table>
                    <button class="adopt-btn" onclick="adoptPet('${pet.name}', '${pet.species}', '${pet.breed}', '${pet.id}')">Adopt me</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
}

// Function to close the popup
function closePopup() {
    const popup = document.querySelector('.pet-popup');
    if (popup) {
        popup.remove();
    }
}

// Updated adoptPet function to handle redirection
function adoptPet(petName, species, breed, petId) {
    // Create URL parameters with pet information
    const params = new URLSearchParams({
        petName: petName,
        species: species,
        breed: breed,
        petId: petId
    });
    
    // Redirect to adoption form page with parameters
    window.location.href = `adoption-form.html?${params.toString()}`;
}

// Add event listeners to checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', displayPets);
});

// Initial display of all pets
displayPets();