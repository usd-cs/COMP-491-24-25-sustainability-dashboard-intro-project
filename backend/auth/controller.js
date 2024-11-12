import { query } from './database_connection.js';
import { get_users_query, get_users_by_id_query, add_users_query, remove_users_query } from './queries.js';

// Get all users
export const get_users = async () => {
    return await query(get_users_query);
};

// Get user by id
export const get_users_by_id = async (user_id) => {
    return await query(get_users_by_id_query, [user_id]);
};

// Add user
export const add_users = async (username, password) => {
    return await query(add_users_query, [username, password]);
};

// Remove user
export const remove_users = async (user_id) => {
    return await query(remove_users_query, [user_id]);
};

// Get user by username
export const get_users_by_username = async (username) => {
    return await query(get_users_by_username_query, [username]);
};

// Get user by username and password
export const get_users_by_username_and_password = async (username, password) => {
    return await query(get_users_by_username_and_password_query, [username, password]);
};

