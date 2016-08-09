import datetime;
from config.db import connection;

def get_user_info (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT user_name FROM users 
					WHERE user_id = %s"""

		cursor.execute(sql,(user_id));
		result = cursor.fetchone();

	utc_timestamp = datetime.datetime.utcnow();
	jst_timestamp = utc_timestamp + datetime.timedelta(hours = 9);

	with connection.cursor() as cursor:
		sql = """UPDATE users SET last_update = %s
					WHERE user_id = %s"""

		cursor.execute(sql,(jst_timestamp,user_id));
		connection.commit();

	print(result);
	return result;