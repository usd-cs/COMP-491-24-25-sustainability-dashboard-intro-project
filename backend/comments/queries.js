// comments table columns
// comment_id integer NOT NULL,
// contents text NOT NULL,
// user_id integer,
// post_id integer

export const get_comments_query = "SELECT comment_id, content, WHERE deleted_at IS NULL";

export const get_comments_by_id_query = "SELECT comment_id, content, WHERE comment_id = $1 AND deleted_at IS NULL";

export const add_comments_query = "INSERT INTO comments (content) VALUES ($1) RETURNING *";

export const remove_comments_query = "UPDATE comments SET deleted_at = NOW() WHERE comment_id = $1 RETURNING *";

export const get_comments_by_post_id_query = "SELECT comment_id, content, WHERE post_id = $1 AND deleted_at IS NULL";