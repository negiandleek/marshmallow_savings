from bottle import redirect;
from app.modules import jwt;
import config.router as root;
import pymysql.cursors;

class Auth:
	def req_auth (func):
		status, user_id = jwt.is_valid_jwt(jwt);
		
    	def wrapper (*arg, **kwargs):
			if status:
				func(status, user_id);

			else :
				redirect(root.SERVER_URL);

			return func;

	def sign_out (jwt):
		user_id = jwt.is_valid_jwt(jwt);
		
		with connection.cursor() as cursor:
			sql = """INSERT INTO use_jwt(jwt, users_id)
						VALUES ("", %s)
						ON DUPLICATE KEY UPDATE jwt = ""
						FROM users
						WHERE user_id = %s;"""

			cursor.execute(sql, (user_id));
			connection.commit();
