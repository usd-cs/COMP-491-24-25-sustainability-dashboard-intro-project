import { addComment } from './queries.js'; // Import the reusable query function for adding comments

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


// // Remove a comment by ID
// export const remove_comment = async (req, res) => {
//   const { comment_id } = req.params;  // Get comment ID from request parameters
//   try {
//     const deletedComment = await remove_comments(comment_id);  // Remove the comment by ID
//     if (!deletedComment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }
//     res.status(204).send();  // Respond with no content (successfully deleted)
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//     res.status(500).json({ message: 'Error deleting comment' });
//   }
// };
