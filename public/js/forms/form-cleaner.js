document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-cleaner');
    const adminId = document.getElementById('adminId'); // Assuming there's a hidden input with the discount ID
    const API_URL = 'https://3cleaningsydney.com:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const adminData = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            dob: formData.get('dob'),
            hiredDate: formData.get('hiredDate'),
            address: formData.get('address'),
           
        };

        const method = adminId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = adminId.value ? `${API_URL}/cleaner/${adminId.value}` : `${API_URL}/cleaner`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminData),
            });


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving cleaner:', errorData);
                alert(`Failed to save cleaner: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            form.reset();
            alert('Cleaner added successfully!');
            

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the cleaner. Please try again.');
        }
    });

});
