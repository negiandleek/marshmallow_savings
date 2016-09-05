from config.db import connection;

def get_actived_goal (goal_id):
	with connection.cursor() as cursor:
		sql = """SELECT date FROM activity_date
					WHERE goal_id = %s""";

		cursor.execute(sql, (goal_id));
		result = cursor.fetchall();

	date = [];
	for li in result:
	    datetime = li["date"].strftime("%Y/%m/%d");
	    date.append(datetime);
	
	return date;

