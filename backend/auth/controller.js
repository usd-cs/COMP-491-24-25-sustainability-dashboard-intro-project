import { queryUserByUsername} from './queries.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Query user by username
    const user = await queryUserByUsername(username);
    console.log(user[0].admin) //gets true 
    //console.log(user[0].admin)
    // If user is not found
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare provided password with hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login response
    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user[0].user_id,
        username: user[0].username,
        admin: user[0].admin,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
