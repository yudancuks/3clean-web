document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-addon');
    const inputId = document.getElementById('inputId'); // Assuming there's a hidden input with the post ID
    const API_URL = 'http://3cleaningsydney.com/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const inputData = {
            name: formData.get('name'),
            totalPrice: Number(formData.get('totalPrice'))     
        };

        
        const method = inputId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = inputId.value ? `${API_URL}/addOns/${inputId.value}` : `${API_URL}/addOns`;
        
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
