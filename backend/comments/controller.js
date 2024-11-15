import { addComment, removeComment } from './queries.js';  // Import the addComment function

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

export const remove_comment = async (req, res) => {
  const { comment_id } = req.params;

  if (!comment_id) {
    console.error('Comment ID is missing');
    return res.status(400).json({ message: 'Comment ID is required' });
  }

  try {
    const result = await removeComment(comment_id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};
