document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-service');
    const inputId = document.getElementById('inputId'); // Assuming there's a hidden input with the post ID
    //const API_URL = 'http://localhost:3000/api';
    const API_URL = 'https://3cleaningsydney.com/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const inputData = {
            packageId: formData.get('packageId'),
            name: formData.get('name'),
            packageType: formData.get('packageType'),
            totalPrice: Number(formData.get('totalPrice'))     
        };

        
        const method = inputId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = inputId.value ? `${API_URL}/packages/${inputId.value}` : `${API_URL}/packages`;
        
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
