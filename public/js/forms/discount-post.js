document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-discount');
    const discountId = document.getElementById('discountId'); // Assuming there's a hidden input with the discount ID
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const discountData = {
            name: formData.get('name'),
            value: parseFloat(formData.get('value')) || 0,
            type: formData.get('type'),
            validFrom: formData.get('validFrom'),
            validUntil: formData.get('validUntil'),
            products: JSON.parse(formData.get('products'))
        };

        const method = discountId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = discountId.value ? `${API_URL}/discounts/${discountId.value}` : `${API_URL}/discounts`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(discountData),
            });


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving discount:', errorData);
                alert(`Failed to save discount: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            form.reset();
            alert('Discount saved successfully!');
            

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the discount. Please try again.');
        }
    });

});
