document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-promo');
    const promoId = document.getElementById('promoId'); // Assuming there's a hidden input with the promotion ID
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const heroData = {
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            linkBtn: formData.get('linkBtn'),
            textBtn: formData.get('textBtn'),
            active: formData.get('active'),
            type: 'promo',
        };

        // Prepare files for upload
        const image = formData.get('image');

        const body = new FormData();

        // Append fields
        for (const key in heroData) {
            body.append(key, heroData[key]);
        }

        // Append files
        if (image) body.append('image', image);

        console.log(body);
        
        const method = promoId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = promoId.value ? `${API_URL}/promotions/${promoId.value}` : `${API_URL}/promotions`;

        try {
            const response = await fetch(url, {
                method: method,
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving promotion:', errorData);
                alert(`Failed to save promotion: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            console.log('Promotion saved successfully:', result);
            alert('Promotion saved successfully!');

            // Optionally, clear the form after successful submission (for POST only)
            if (!promoId.value) {
                form.reset();
                document.getElementById('imagePreview').src = '#';
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the promotion. Please try again.');
        }
    });

    // Image preview functionality
    const imageInput = document.getElementById('image');
    
    const updateImagePreview = (input, previewId) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById(previewId).src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    imageInput.addEventListener('change', () => updateImagePreview(imageInput, 'imagePreview'));
});
