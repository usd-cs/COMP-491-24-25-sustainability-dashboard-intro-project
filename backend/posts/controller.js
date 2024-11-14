import { getAllPosts, addPost, removePost} from './queries.js'; // Import the query functions

// Get all posts
export const get_posts = async (req, res) => {
  try {
    const posts = await getAllPosts();  // Fetch all posts from the database
    res.json(posts);  // Return posts as JSON
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


// Add a new post
export const add_posts = async (req, res) => {
  const { title, contents } = req.body;
  try {
    const newPost = await addPost(title, contents);  // Add new post to the database
    res.status(201).json(newPost);  // Respond with the newly added post
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ message: 'Error adding post' });
  }
};

// Remove a post by ID
export const remove_posts = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await removePost(id);  // Remove the post by ID
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(204).send();  // Respond with no content (successfully deleted)
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};
