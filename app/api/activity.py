from config.db import connection;

import datetime;

def get_actived_goal (goal_id):
	with connection.cursor() as cursor:
		sql = """SELECT date FROM activity_date
					WHERE goal_id = %s""";

		cursor.execute(sql, (goal_id));
		result = cursor.fetchall();

	date_list = [];
	for li in result:
		now = datetime.datetime.now();
		diff = now - li["date"]
		diff_date = diff.days;
		if diff_date <= 91:
			date_str = li["date"].strftime("%Y/%m/%d");
			date_list.append(date_str);
	
	return date_list;

