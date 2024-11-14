import { query } from '../database_connection.js';
import { get_comments_query, get_comments_by_id_query, add_comments_query, remove_comments_query, get_comments_by_post_id_query } from './queries.js';

// Get all comments
export const get_comments = async () => {
    return await query(get_comments_query);
};

// Get comment by id
export const get_comments_by_id = async (comment_id) => {
    return await query(get_comments_by_id_query, [comment_id]);
};

// Add comment
export const add_comments = async (content, user_id, post_id) => {
    return await query(add_comments_query, [content, user_id, post_id]);
};

// Remove comment
export const remove_comments = async (comment_id) => {
    return await query(remove_comments_query, [comment_id]);
};

// Get comments by post id
export const get_comments_by_post_id = async (post_id) => {
    return await query(get_comments_by_post_id_query, [post_id]);
};



