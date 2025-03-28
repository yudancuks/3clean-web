document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-blog');
    const postId = document.getElementById('postId'); // Assuming there's a hidden input with the post ID
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const blogData = {
            title: formData.get('title'),
            body: formData.get('bodyPost'),
            active: formData.get('active'),
            active: formData.get('favourite'),
            category: JSON.parse(formData.get('category'))          
        };
        console.log(formData.get('category'));
        // Prepare files for upload
        const image = formData.get('image');

        const body = new FormData();

        // Append fields
        for (const key in blogData) {
            body.append(key, blogData[key]);
        }

        // Append files
        if (image) body.append('image', image);
        
        const method = postId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = postId.value ? `${API_URL}/vsight/${postId.value}` : `${API_URL}/vsight`;

        try {
            const response = await fetch(url, {
                method: method,
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving vsight:', errorData);
                alert(`Failed to save vsight: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            alert('Vsight saved successfully!');

            // Optionally, clear the form after successful submission (for POST only)
            if (!postId.value) {
                form.reset();
                document.getElementById('imagePreview').src = '#';
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the vsight. Please try again.');
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
