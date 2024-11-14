
// Add a new comment
export const add_comment = async (req, res) => {
  const { contents, user_id, post_id } = req.body;  // Extract fields from request body
  try {
    // Add the comment to the database
    const newComment = await add_comments(contents, user_id, post_id);
    res.status(201).json(newComment);  // Respond with the newly added comment
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};


// Remove a comment by ID
export const remove_comment = async (req, res) => {
  const { comment_id } = req.params;  // Get comment ID from request parameters
  try {
    const deletedComment = await remove_comments(comment_id);  // Remove the comment by ID
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(204).send();  // Respond with no content (successfully deleted)
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};
