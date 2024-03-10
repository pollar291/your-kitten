FIND_USER_BY_EMAIL = "SELECT * FROM users u WHERE u.email = %s"
AUTH_USER = "INSERT INTO sessions (uuid, user_id) VALUES (%s, %s) RETURNING *;"
CHECK_AUTH = "SELECT * FROM sessions s WHERE s.uuid = %s"
CREATE_USER = "INSERT INTO users (email, password) VALUES (%s, %s) RETURNING *;"

CREATE_POST = "INSERT INTO posters (title, name, address, phone, status, description) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *;"
CREATE_USER_POST = "INSERT INTO user_posters (user_id, poster_id) VALUES (%s, %s) RETURNING *;"
CREATE_POSTER_IMAGE = "INSERT INTO poster_images (poster_id, image) VALUES (%s, %s) RETURNING id;"
GET_POSTER = "SELECT p.id, p.title, p.name, p.address, p.phone, p.status, p.description, (SELECT jsonb_agg(pi.id) FROM poster_images pi WHERE p.id = pi.poster_id) AS image_ids, (SELECT u.email FROM user_posters up JOIN users u ON u.id = up.user_id WHERE up.poster_id = p.id) as authorEmail FROM posters p WHERE p.id = %s"
GET_POSTERS = "SELECT p.id, p.title, p.name, p.address, p.phone, p.status, p.description, (SELECT jsonb_agg(pi.id) FROM poster_images pi WHERE p.id = pi.poster_id) AS image_ids, (SELECT u.email FROM user_posters up JOIN users u ON u.id = up.user_id WHERE up.poster_id = p.id) as authorEmail FROM posters p"

GET_POSTER_IMAGE = "SELECT pi.image FROM poster_images pi WHERE pi.id = %s"