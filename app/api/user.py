import datetime;
from config.db import connection;

def get_user_info (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT user_name FROM users 
					WHERE user_id = %s"""

		cursor.execute(sql,(user_id));
		result = cursor.fetchone();

	return result;