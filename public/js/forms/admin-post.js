document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-admin');
    const adminId = document.getElementById('adminId'); // Assuming there's a hidden input with the discount ID
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const adminData = {
            userName: formData.get('userName'),
            fullName: formData.get('fullName'),
            emailAddress: formData.get('emailAddress'),
            password: formData.get('password'),
        };

        if(formData.get('password') !== formData.get('repassword')){
            alert("Password did not match");
            return;
        }

        const method = adminId.value ? 'PUT' : 'POST'; // Use PUT if there's an ID (edit mode), else POST (create mode)
        const url = adminId.value ? `${API_URL}/users/${adminId.value}` : `${API_URL}/users`;

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
                console.error('Error saving admin:', errorData);
                alert(`Failed to save admin: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            form.reset();
            alert('Admin added successfully!');
            

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while saving the admin. Please try again.');
        }
    });

});
