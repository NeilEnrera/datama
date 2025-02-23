document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    const imageInput = document.getElementById('petImage');
    const imagePreview = document.getElementById('imagePreview');
    const missingPetsGrid = document.querySelector('.missing-pets-grid');

    // Debug log to check if elements are found
    console.log('Elements found:', {
        reportForm: !!reportForm,
        imageInput: !!imageInput,
        imagePreview: !!imagePreview,
        missingPetsGrid: !!missingPetsGrid
    });

    if (!reportForm || !imageInput || !imagePreview || !missingPetsGrid) {
        console.error('Some elements not found!');
        return;
    }

    // Handle image preview
    imageInput.addEventListener('change', function(e) {
        console.log('Image selected:', e.target.files[0]?.name);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.display = 'block';
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Pet preview">`;
                console.log('Image preview created');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        try {
            // Validate fields
            const category = document.querySelector('input[name="category"]:checked');
            if (!category) {
                throw new Error('Please select a category');
            }

            const petName = document.getElementById('petName').value;
            const lastSeen = document.getElementById('lastSeen').value;
            const contactNumber = document.getElementById('contactNumber').value;
            const description = document.getElementById('description').value;
            
            console.log('Form values:', {
                category: category.value,
                petName,
                lastSeen,
                contactNumber,
                description
            });

            // Check image
            const imageElement = imagePreview.querySelector('img');
            if (!imageElement) {
                throw new Error('Please upload a pet image');
            }
            const imageUrl = imageElement.src;

            // Create and add poster
            const posterHTML = `
                <div class="poster">
                    <div class="poster-header">
                        <h3>MISSING ${category.value.toUpperCase()}</h3>
                    </div>
                    <div class="poster-content">
                        <img src="${imageUrl}" alt="${petName}">
                        <div class="poster-details">
                            <h4>${petName}</h4>
                            <p><strong>Last Seen:</strong> ${lastSeen}</p>
                            <p><strong>Description:</strong> ${description}</p>
                            <div class="contact-info">
                                <p class="phone-number">${contactNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            console.log('Adding poster to grid');
            missingPetsGrid.insertAdjacentHTML('afterbegin', posterHTML);

            // Reset form
            reportForm.reset();
            imagePreview.style.display = 'none';
            imagePreview.innerHTML = '';

            console.log('Poster added successfully');
            alert('Poster generated successfully!');
            
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error generating poster. Please try again.');
        }
    });
});