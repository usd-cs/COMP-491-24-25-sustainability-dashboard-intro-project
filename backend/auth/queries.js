// user table columns
// user_id integer NOT NULL,
//     username character varying(100),
//     admin boolean DEFAULT false,
//     password character varying(255) NOT NULL

export const get_users_query = "SELECT user_id, username FROM users WHERE deleted_at IS NULL";

export const get_users_by_id_query = "SELECT user_id, username FROM users WHERE user_id = $1 AND deleted_at IS NULL";

export const add_users_query = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

export const remove_users_query = "UPDATE users SET deleted_at = NOW() WHERE user_id = $1 RETURNING *";

export const get_users_by_username_query = "SELECT user_id, username FROM users WHERE username = $1 AND deleted_at IS NULL";

export const get_users_by_username_and_password_query = "SELECT user_id, username FROM users WHERE username = $1 AND password = $2 AND deleted_at IS NULL";

