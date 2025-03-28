document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-product');
    const productId = document.getElementById('productId'); // Assuming there's a hidden input with the product ID
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const productData = {
            identityNumber: formData.get('code'),
            name: formData.get('name'),
            brand: formData.get('brand'),
            manufacture: formData.get('manufacture'),
            description: formData.get('descriptionText'),
            price: parseFloat(formData.get('price')) || 0
        };

        // Prepare files for upload
        const thumbnail = formData.get('thumbnail');
        const images = formData.getAll('images');
        const detailProduct = formData.get('detailproduct');

        const body = new FormData();

        // Append fields
        for (const key in productData) {
            body.append(key, productData[key]);
        }

        // Append files
        if (thumbnail) body.append('thumbnail', thumbnail);
        images.forEach((image) => {
            if (image) body.append('images', image);
        });
        if (detailProduct) body.append('detailProduct', detailProduct);
        
        const method = productId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = productId.value ? `${API_URL}/products/${productId.value}` : `${API_URL}/products`;

        try {
            const response = await fetch(url, {
                method: method,
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving product:', errorData);
                alert(`Failed to save product: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            alert('Product saved successfully!');

            // Optionally, clear the form after successful submission (for POST only)
            if (!productId.value) {
                form.reset();
                document.getElementById('imagePreview').src = '#';
                document.getElementById('detailPreview').src = '#';
            }
        } catch (error) {
            console.error('An error occurred:', error);
            //alert('An error occurred while saving the product. Please try again.');
        }
    });

    // Image preview functionality
    const thumbnailInput = document.getElementById('thumbnail');
    const detailProductInput = document.getElementById('detailproduct');

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

    thumbnailInput.addEventListener('change', () => updateImagePreview(thumbnailInput, 'imagePreview'));
    detailProductInput.addEventListener('change', () => updateImagePreview(detailProductInput, 'detailPreview'));
});
