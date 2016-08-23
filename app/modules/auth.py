from bottle import request, redirect;
from app.modules import jwt;
import config.router as root;
import pymysql.cursors;
import datetime;
from app.api.goal import get_active_goal;
from config.db import connection;
from functools import wraps;

def req_auth (func):
	
	@wraps(func)
	def wrapper():
		payload = request.json["payload"];
		__jwt = payload["jwt"];
		status, user_id = jwt.is_valid_jwt(__jwt);

		if status:
			result_goal_data = get_active_goal(user_id);
			goals_id = result_goal_data["id"];

			# last_update確認して日にちをまたいでいたらtodoのachiveをFalseにする
			# NOW()時間がずれている
			with connection.cursor() as cursor:
				sql = """UPDATE todos SET achieve = 0
							WHERE goals_id = %s 
							AND 1 <= DATEDIFF(
								NOW(),
								(SELECT last_update FROM users
									WHERE user_id = %s)
							)"""
				cursor.execute(sql,(goals_id, user_id));
				connection.commit();
				
			with connection.cursor() as cursor:
				sql = """UPDATE users SET last_update = NOW()
							WHERE user_id = %s"""

				cursor.execute(sql,(user_id));
				connection.commit();

			result = func(user_id);

		else :
			redirect(root.SERVER_URL);

		return result;
	return wrapper;

def sign_out ():
	payload = request.json["payload"];
	__jwt = payload["jwt"];
	result = jwt.is_valid_jwt(__jwt);
	user_id = result[1];

	with connection.cursor() as cursor:
		sql = """INSERT INTO use_jwt(jwt, users_id)
					VALUES ("", %s)
					ON DUPLICATE KEY UPDATE jwt = ""
					FROM users
					WHERE user_id = %s;"""

		cursor.execute(sql, (user_id));
		connection.commit();

	redirect(root.SERVER_URL);