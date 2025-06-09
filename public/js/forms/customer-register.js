document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-register');
    //const API_URL = 'http://localhost:3000/api';
    const API_URL = 'https://3cleaningsydney.com/api';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const password = formData.get('password');
        const repassword = formData.get('repassword');

        // Check if password and repassword match
        if (password !== repassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        // Prepare data to send to the API
        const userData = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            password: password
        };

        const method = 'POST'; 
        const url = `${API_URL}/customer/register`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include' 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error trying register:', errorData);
                alert(`Error trying register: ${errorData.message}`);
                return;
            }

            const result = await response.json();
            document.cookie = `auth_token=${result.token}; path=/; max-age=${60 * 60 * 3};`; // Save token for 3 hours
            
            setTimeout(() => {
                window.location.href = '/'; // Redirect after login
            }, 1500);

        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while trying to register. Please try again.');
        }
    });
});
