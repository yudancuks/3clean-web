document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    const API_URL = 'http://localhost:3000/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // Prepare data to send to the API
        const userData = {
            emailAddress: formData.get('email'),
            password: formData.get('password')
        };

        const method = 'POST'; 
        const url = `${API_URL}/auth/login`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error trying login:', errorData);
                alert(`Error trying login: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            document.cookie = `auth_token=${result.token}; path=/; max-age=${60 * 60 * 3};`; // Save token for 3 hours
            
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redirect after login
            }, 1500);
           

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while trying to login. Please try again.');
        }
    });
});
