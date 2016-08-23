from config.db import connection;

# crud
def create_todo (goal_id, value):
	with connection.cursor() as cursor:
		sql = """INSERT INTO todos(goals_id, value)
					VALUES (%s, %s);
				SElECT id , value, achieve FROM todos
					WHERE id = goal_id;"""

		cursor.execute(sql,(goal_id, value));
		connection.commit();

	return;

def read_todo (goal_id):
	with connection.cursor() as cursor:
		sql = """SELECT id, value, achieve FROM todos
					WHERE goals_id = %s;"""

		__result = cursor.execute(sql, (goal_id));
		result = cursor.fetchall();

	return result;

def update_todo (todo_id, value):
	with connection.cursor() as cursor:
		sql = """UPDATE todos SET value = %s 
					WHERE = %s;"""

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

def toggle_todo (todo_id):
	pass;