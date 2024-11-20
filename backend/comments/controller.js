import { addComment } from './queries.js'; // Import the reusable query function for adding comments
import { deleteComment } from './queries.js'; // Import the reusable query function for deleting comments

export const add_comment = async (req, res) => {
  const { contents, user_id, post_id } = req.body;

  console.log('Add Comment Request:', { contents, user_id, post_id });

  try {
    const newComment = await addComment(contents, user_id, post_id);
    console.log('New Comment Added:', newComment);

    res.status(201).json(newComment); // Return the newly created comment
  } catch (error) {
    console.error('Error adding comment:', error); // Log the detailed error
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

export const delete_comment = async (req, res) => {
  const { comment_id } = req.params;

  console.log('Delete Comment Request:', { comment_id });

  try {
    const deletedComment = await deleteComment(comment_id);
    console.log('Deleted Comment:', deletedComment);

    res.status(200).json(deletedComment); // Return the deleted comment
  } catch (error) {
    console.error('Error deleting comment:', error); // Log the detailed error
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
}


