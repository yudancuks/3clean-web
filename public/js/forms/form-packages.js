document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-package');
    const inputId = document.getElementById('inputId'); // Assuming there's a hidden input with the post ID
    const serviceId = document.getElementById('serviceId');
    const API_URL = 'https://3cleaningsydney.com:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const inputData = {
            totalPrice: Number(formData.get('totalPrice')),
            name: formData.get('name'),    
        };

        
        const method = inputId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = inputId.value ? `${API_URL}/packages/detail/${inputId.value}` : `${API_URL}/packages/detail/${serviceId.value}`;
        
        try {

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            });


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving data:', errorData);
                alert(`Failed to save data: ${errorData.message}`);
                return;
            }

            alert('Data Saved Successfully!');

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the vsight. Please try again.');
        }
    });
});
