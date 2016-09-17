from config.db import connection;

def get_active_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num, create_date FROM goals 
					WHERE user_id = %s and active = 1"""

		__result = cursor.execute(sql,(user_id));
		result = cursor.fetchone();

		if result is None:
			return result;
			
		result["create_date"] = result["create_date"].strftime("%Y-%m-%d");

	return result;

def get_achive_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num FROM goals 
					WHERE user_id = %s and active = 0 and achieve = 1"""

		result = cursor.execute(sql,(user_id));

def create_goal (user_id, value):
	with connection.cursor() as cursor:
		sql = """INSERT INTO goals (user_id, value, create_date) 
					VALUES (%s, %s, NOW());"""

		cursor.execute(sql,(user_id, value));
		connection.commit();

	return get_active_goal(user_id);

def update_goal (goal_id, value):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET value = %s 
					WHERE id = %s"""

		cursor.execute(sql,(value, goal_id));
		connection.commit();

def delete_goal (goal_id):
	with connection.cursor() as cursor:
		sql = """DELETE FROM goals
					WHERE id = %s;"""

		cursor.execute(sql,(goal_id));
		connection.commit();

def achieve_goal (goal_id):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET achieve = 1, active = 0;
					WHERE goal_id = %s""";

		cursor.execute(sql,(goal_id));

def increment_marshmallows_num (goal_id):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET 
					marshmallows_num  = (
						SELECT marshmallows_num + 1 FROM (
							SELECT * FROM goals
						) AS c1 WHERE c1.id = %s
					),
					last_update = NOW() 
					WHERE id = %s
					AND active = 1 
					AND 1 <= DATEDIFF(
						NOW(), 
						(
							SELECT last_update FROM (
								SELECT * FROM goals
							) AS c2 WHERE c2.id = %s
						)
					);"""

		execution_result = cursor.execute(sql,(goal_id, goal_id, goal_id));
		connection.commit();

	if execution_result:
		with connection.cursor() as cursor:
			sql = """INSERT INTO activity_date (goal_id, date)
				VALUES (%s, NOW());"""

			cursor.execute(sql,(goal_id));
			connection.commit();

	return execution_result;