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
      // Store user ID and possibly other user details in localStorage
      localStorage.setItem('userId', response.data.user.user_id); // Store user ID
      localStorage.setItem('userName', response.data.user.username); // Optional: Store username or other data
      router.push('/authorized'); // Redirect to authorized page
      return response.data.message; // Return message received from backend
    } else {
      return 'Unexpected response from server.';
    }
  } catch (error) {
    // Handle error response
    if (error.response) {
      // Return error message from backend (if any)
      return error.response.data.message || 'Invalid login credentials.';
    } else {
      // Handle server issues or other errors
      return 'Server error. Please try again later.';
    }
  }
}
