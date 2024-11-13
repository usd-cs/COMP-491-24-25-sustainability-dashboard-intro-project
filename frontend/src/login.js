
import axios from 'axios';

export async function login(formData, router) {
  try {
    // Ensure the formData is not empty
    if (!formData.username || !formData.password) {
      return 'Please enter your username and password.';
    }

    // Make POST request to backend login endpoint
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: formData.username,
      password: formData.password,
    });

    // Handle successful login
    if (response.status === 200) {
      localStorage.setItem('userId', response.data.user.user_id); // Store user ID in local storage
      router.push('/authorized'); // Redirect to authorized page
      return response.data.message;
    } else {
      return 'Unexpected response from server.';
    }
  } catch (error) {
    // Handle error response
    if (error.response) {
      return error.response.data.message || 'Invalid login credentials.';
    } else {
      return 'Server error. Please try again later.';
    }
  }
}
