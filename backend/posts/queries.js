// Post Table Columns 
// post_id integer NOT NULL,
// contents text NOT NULL,
// user_id integer

export const get_posts_query = "SELECT post_id, content, WHERE deleted_at IS NULL";

export const get_posts_by_id_query = "SELECT post_id, content, WHERE post_id = $1 AND deleted_at IS NULL";

export const add_posts_query = "INSERT INTO posts (content) VALUES ($1) RETURNING *";

export const remove_posts_query = "UPDATE posts SET deleted_at = NOW() WHERE post_id = $1 RETURNING *";



