import { getAllPosts, addPost, removePost} from './queries.js'; // Import the query functions

// Get all posts adn comments associated 
export const get_posts = async (req, res) => {
  try {
    const postsWithComments = await getAllPosts();  // Fetch all posts and comments

    // Group comments by post_id to attach them under the corresponding post
    const posts = postsWithComments.reduce((acc, row) => {
      const postIndex = acc.findIndex(post => post.post_id === row.post_id);

      // If the post already exists in the accumulator, add the comment to the post's comments array
      if (postIndex !== -1) {
        if (row.comment_id) {
          acc[postIndex].comments.push({
            comment_id: row.comment_id,
            contents: row.comment_contents,
            user_id: row.user_id
          });
        }
      } else {
        // If the post doesn't exist, create a new post object with the comment
        acc.push({
          post_id: row.post_id,
          contents: row.post_contents,
          comments: row.comment_id ? [{
            comment_id: row.comment_id,
            contents: row.comment_contents,
            user_id: row.user_id
          }] : []
        });
      }

      return acc;
    }, []);

    res.json(posts);  // Return the posts with their associated comments as JSON
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
