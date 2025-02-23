document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Auto-fill pet information if available
    if (urlParams.has('petName')) {
        document.getElementById('petName').value = urlParams.get('petName');
    }
    
    if (urlParams.has('species')) {
        const species = urlParams.get('species').toLowerCase();
        if (species === 'dog') {
            document.getElementById('dog').checked = true;
        } else if (species === 'cat') {
            document.getElementById('cat').checked = true;
        }
    }
    
    if (urlParams.has('breed')) {
        document.getElementById('breed').value = urlParams.get('breed');
    }

    // Improved homeownership functionality
    const homeOwnershipRadios = document.querySelectorAll('input[name="homeOwnership"]');
    const landlordApprovalDiv = document.getElementById('landlordApproval');
    const landlordApprovalRadios = document.querySelectorAll('input[name="landlordApproval"]');

    homeOwnershipRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'rent') {
                landlordApprovalDiv.classList.remove('hidden');
                landlordApprovalRadios.forEach(radio => radio.required = true);
            } else {
                landlordApprovalDiv.classList.add('hidden');
                landlordApprovalRadios.forEach(radio => {
                    radio.required = false;
                    radio.checked = false;
                });
            }
        });
    });

    // Check initial state for homeownership
    const initialRentRadio = document.querySelector('input[name="homeOwnership"][value="rent"]');
    if (initialRentRadio && initialRentRadio.checked) {
        landlordApprovalDiv.classList.remove('hidden');
        landlordApprovalRadios.forEach(radio => radio.required = true);
    }

    // Form handling
    const form = document.getElementById('adoptionForm');
    if (!form) {
        console.error('Adoption form not found');
        return;
    }

    // Create download buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'download-buttons';
    buttonContainer.style.display = 'none';
    buttonContainer.style.textAlign = 'center';

    // Create PDF download button
    const downloadPdfBtn = document.createElement('button');
    downloadPdfBtn.className = 'download-btn pdf-btn';
    downloadPdfBtn.type = 'button';
    downloadPdfBtn.textContent = 'Download as PDF';
    downloadPdfBtn.style.margin = '0 auto';

    // Add button to container
    buttonContainer.appendChild(downloadPdfBtn);

    // Find submit button and insert download button after it
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.parentNode.insertBefore(buttonContainer, submitBtn.nextSibling);
    }

    // Helper function to generate reference number
    function generateReferenceNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `ADP-${year}${month}${day}-${random}`;
    }

    // Function to generate form content
    function generateFormContent(formData) {
        let content = '\n\n';
        content += '                    PET ADOPTION APPLICATION\n';
        content += '_____________________________________________________\n\n';

        const sections = {
            'APPLICANT INFORMATION': {
                'Full Name': 'fullName',
                'Email Address': 'email',
                'Phone Number': 'phone',
                'Home Address': 'address',
                'City': 'city',
                'ZIP Code': 'zipCode'
            },
            'PET INFORMATION': {
                'Name of Pet': 'petName',
                'Species': 'species',
                'Breed': 'breed'
            },
            'HOUSEHOLD INFORMATION': {
                'Home Ownership': 'homeOwnership',
                'Landlord Approval': 'landlordApproval',
                'Household Agreement': 'householdAgree',
                'Other Pets': 'otherPets',
                'Current Pets List': 'petsList',
                'Fenced Yard': 'fencedYard',
                'Pet Location': 'petLocation',
                'Hours Alone Per Day': 'hoursAlone'
            },
            'EXPERIENCE & COMMITMENT': {
                'Previous Pet Owner': 'previousPets',
                'Primary Caregiver': 'primaryCaregiver',
                'Agree to Vet Care': 'vetCare'
            },
            'ADDITIONAL COMMENTS': {
                'Comments': 'comments'
            }
        };

        for (const [section, fields] of Object.entries(sections)) {
            content += `\n${section}\n`;
            content += '_____________________________________________________\n\n';
            
            for (const [label, fieldName] of Object.entries(fields)) {
                let value = formData.get(fieldName);
                if (value) {
                    if (['yes', 'no', 'indoors', 'outdoors', 'both', 'own', 'rent'].includes(value)) {
                        value = value.charAt(0).toUpperCase() + value.slice(1);
                    }
                    content += `   ${label}: ${value}\n`;
                }
            }
            content += '\n';
        }

        content += '_____________________________________________________\n\n';
        content += '   Application submitted on: ' + new Date().toLocaleString() + '\n';
        content += '   Reference Number: ' + generateReferenceNumber() + '\n\n';
        content += '   Signature: \n';
        content += '   Date: \n\n';
        content += '   For Office Use Only:\n';
        content += '   [    ] Approved    [    ] Pending    [    ] Declined\n';
        content += '\n';  // Extra spacing
        content += '   Staff Signature: \n\n';
        
        return content;
    }

    // PDF download handler
    if (window.jspdf) {
        downloadPdfBtn.addEventListener('click', function() {
            const formData = new FormData(form);
            const content = generateFormContent(formData);
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add border
            doc.setDrawColor(0);
            doc.setLineWidth(0.5);
            doc.rect(10, 10, 190, 277);

            // Set initial font styles
            doc.setFont("helvetica");
            doc.setFontSize(12);

            const lines = content.split('\n');
            let y = 25;

            lines.forEach(line => {
                if (y > 265) {
                    doc.addPage();
                    doc.rect(10, 10, 190, 277);
                    y = 25;
                }

                // Enhanced header and section styling
                if (line.includes('PET ADOPTION APPLICATION')) {
                    doc.setFontSize(20);
                    doc.setFont("helvetica", "bold");
                    const textWidth = doc.getStringUnitWidth(line) * 20 / doc.internal.scaleFactor;
                    const textOffset = (190 - textWidth) / 2;
                    doc.text(textOffset, y, line);
                    y += 10;
                } else if (line.includes('___')) {
                    doc.setLineWidth(0.2);
                    doc.line(20, y, 190, y);
                    y += 3;
                } else if (line.match(/^[A-Z\s&]+$/) && line.length > 5) {
                    // Section titles (all caps)
                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");
                    doc.text(20, y, line);
                    y += 7;
                } else if (line.includes('For Office Use Only:')) {
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.text(20, y, line);
                    y += 7;
                } else if (line.includes('[    ] Approved')) {
                    // Special handling for office use checkboxes
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    
                    // Draw boxes for each option
                    const boxSize = 8;
                    const yPos = y - 6;
                    
                    // Approved box
                    doc.rect(35, yPos, boxSize, boxSize);
                    doc.text('Approved', 45, y);
                    
                    // Pending box
                    doc.rect(95, yPos, boxSize, boxSize);
                    doc.text('Pending', 105, y);
                    
                    // Declined box
                    doc.rect(155, yPos, boxSize, boxSize);
                    doc.text('Declined', 165, y);
                    
                    y += 7;
                } else if (line.includes('Signature:') || line.includes('Date:') || line.includes('Staff Signature:')) {
                    // Handle signature and date lines
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    
                    // Get the label (everything before the colon)
                    const label = line.trim().split(':')[0] + ':';
                    
                    if (line.includes('Staff Signature:')) {
                        // Add extra spacing before staff signature
                        y += 3;
                        doc.text(20, y, label);
                        doc.line(80, y, 170, y);
                    } else if (line.includes('Date:')) {
                        // Shorter line for date
                        doc.text(20, y, label);
                        doc.line(80, y, 140, y);
                    } else {
                        // Regular signature line
                        doc.text(20, y, label);
                        doc.line(80, y, 170, y);
                    }
                    
                    y += 7;
                } else {
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text(20, y, line);
                    y += 7;
                }
            });

            doc.save('pet-adoption-application.pdf');

            setTimeout(() => {
                window.location.href = 'adopt.html';
            }, 1000);
        });
    } else {
        downloadPdfBtn.style.display = 'none';
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            submitBtn.style.display = 'none';
            buttonContainer.style.display = 'block';
            alert('Form submitted successfully! Click the download button to save your application.');
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Error handling for required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            } else {
                this.classList.add('error');
            }
        });
    });
});