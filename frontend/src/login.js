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
      const user = response.data.user;
      //console.log(user)
      localStorage.setItem('userId', user.user_id); // Store user ID
      localStorage.setItem('userName', user.username); // Optional: Store username or other data
      localStorage.setItem('admin',user.admin)
      
      // Check if the user is an admin
      if (user.admin === true) {
        // Return 'admin' to indicate the user is an admin
        router.push('/adminauthorized');
        return 'Admin login successful, redirecting to admin page.';
      } else {
        // Return 'user' to indicate a normal user
        router.push('/authorized');
        return 'User login successful, redirecting to user page.';
      }
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
