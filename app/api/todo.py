from config.db import connection;

# crud
def create_todo (goal_id, value):
	with connection.cursor() as cursor:
		sql = """INSERT INTO todos(goals_id, value)
					VALUES (%s, %s);"""

		cursor.execute(sql,(goal_id, value));
		connection.commit();

	return read_todo(goal_id);

def read_todo (goal_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, achieve FROM todos
					WHERE goals_id = %s
					ORDER BY id DESC;"""

		__result = cursor.execute(sql, (goal_id));
		result = cursor.fetchall();

	return result;

def update_todo (todo_id, value):
	with connection.cursor() as cursor:
		sql = """UPDATE todos SET value = %s 
					WHERE id = %s;"""

		cursor.execute(sql,(value, todo_id));
		connection.commit();

	return;

def delete_todo (todo_id):
	with connection.cursor() as cursor:
		sql = """DELETE FROM todos 
					WHERE id = %s;"""

		cursor.execute(sql, (todo_id));
		connection.commit();

	return;

def achieve_toggle_todo (todo_id):
	with connection.cursor() as cursor:
		sql = """SELECT achieve FROM todos
					WHERE id = %s;""";

		cursor.execute(sql, (todo_id));
		result = cursor.fetchone();

	int_bool = 0 if result["achieve"] else 1

	with connection.cursor() as cursor:
		sql = """UPDATE todos SET achieve = %s
					WHERE id = %s;""" 

		cursor.execute(sql, (int_bool, todo_id));
		connection.commit();

	return;