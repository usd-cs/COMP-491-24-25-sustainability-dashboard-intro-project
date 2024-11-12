import { get_posts_query, get_posts_by_id_query, add_posts_query, remove_posts_query } from './queries.js';
import { query } from './database_connection.js';

// Get all posts
export const get_posts = async () => {
    return await query(get_posts_query);
};

// Get post by id
export const get_posts_by_id = async (post_id) => {
    return await query(get_posts_by_id_query, [post_id]);
};

// Add post
export const add_posts = async (title, content) => {
    return await query(add_posts_query, [title, content]);
};

// Remove post
export const remove_posts = async (post_id) => {
    return await query(remove_posts_query, [post_id]);
};