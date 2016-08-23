from config.db import connection;

def get_active_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num FROM goals 
					WHERE user_id = %s and active = 1"""

		__result = cursor.execute(sql,(user_id));
		result = cursor.fetchone();

		return result;

def get_achive_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num FROM goals 
					WHERE user_id = %s and active = 0 and achieve = 1"""

		result = cursor.execute(sql,(user_id));

def create_goal (user_id, value):
	with connection.cursor() as cursor:
		sql = """INSERT INTO goals (user_id, value) 
					VALUES (%s, %s);"""

	cursor.execute(sql,(user_id, value));
	connection.commit();

def update_goal (user_id ,value, goal_id):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET value = %s 
					WHERE user_id = %s 
						AND goal_id = %s"""

		cursor.execute(sql,(value, user_id, goal_id));

def delete_goal (user_id, goal_id):
	with connection.cursor() as cursor:
		sql = """DELETE FROM goals
					WHERE user_id = %s, goal_id = %s;"""

		cursor.execute(sql,(user_id, goal_id));

def achieve_goal (user_id, goal_id):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET achieve = 1, active = 0;
					WHERE user_id = %s, goal_id = %s""";

		cursor.execute(sql,(user_id, goal_id));

def increment_marshmallows_num (user_id, goal_id):
	with connection.cursor() as cursor:
		sql = """UPDATE goals SET marshmallows_num = (
						SELECT marshmallows_num + 1 
						FROM (SELECT * FROM goals) AS c1 
						WHERE c1.user_id = %s 
						AND c1.id = %s
						AND c1.active = 1 
					) 
					WHERE user_id = %s 
					AND id = %s
					AND active = 1;"""

		cursor.execute(sql,(user_id, goal_id, user_id, goal_id));
		connection.commit()

# update activity day;