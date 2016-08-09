from config.db import connection;

def get_active_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num FROM users 
					WHERE user_id = %s and active = 1"""

		result = cursor.execute(sql,(user_id));

def get_achive_goal (user_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, marshmallows_num FROM users 
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
		sql = """SELECT marshmallows_num FROM users 
					WHERE user_id = %s and active = 1"""

		cursor.execute(sql,(num, user_id, goal_id));

	num = cursor.execute(sql,(user_id, goal_id));
	num += 1;

	with connection.cursor() as cursor:
		sql = """UPDATE goals SET marshmallows_num = %s
					WHERE user_id = %s, goal_id = %s""";

		cursor.execute(sql,(num, user_id, goal_id));

# update activity day;
