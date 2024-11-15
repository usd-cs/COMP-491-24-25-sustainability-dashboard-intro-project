import { addComment, removeComment } from './queries.js';  // Import the addComment function

// Add a new comment
export const add_comment = async (req, res) => {
  try {
    const { content, post_id } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content cannot be null or empty.' });
    }

    const newComment = await addComment(content, post_id);
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: error.message });
  }
};
// Remove a comment by ID
export const remove_comment = async (req, res) => {
  const { comment_id } = req.params;  // Get comment ID from request parameters
  
  console.log('Comment ID to delete:', comment_id);  // Log the comment ID

  try {
    // Call the removeComment function from queries.js (or appropriate service)
    const result = await removeComment(comment_id);

    // If no rows were affected, the comment wasn't found
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Send a success message if comment was deleted successfully
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    
    // Enhance error handling by distinguishing between different types of errors
    if (error.code === '23503') {
      return res.status(400).json({ message: 'Cannot delete comment due to existing dependencies' });
    }
    
    res.status(500).json({ message: 'Error deleting comment' });  // Handle general error
  }
};
