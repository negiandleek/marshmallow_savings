import datetime;
import hmac;
import jwt;
import pymysql.cursors;
from config.db import connection;
from app.modules.error import UnauthenticationError;

with open("./app/env/private.pem","rb") as f:
		private_pem = f.read();
secret = hmac.new(private_pem,None,"sha256").digest();

def generate_jwt(user_id):
	exp = datetime.datetime.utcnow() + datetime.timedelta(days = 7);
	encoded = jwt.encode({"exp": exp,"user_id": user_id}, secret, algorithm="HS256").decode('utf-8');

	with connection.cursor() as cursor:
		sql = """INSERT INTO use_jwt(jwt, users_id)
					VALUES (%s, %s)
					ON DUPLICATE KEY UPDATE jwt= %s"""
		
		cursor.execute(sql, (encoded, user_id, encoded));
		connection.commit();

	return encoded;

def is_valid_jwt (str_jwt):
	state = True;
	reflesh_jwt = "";
	user_id = "";
	try:
		# change str type to byte type;
		encoded_jwt = str_jwt.encode("utf-8");
		decoded = jwt.decode(encoded_jwt, secret, verify=True);
		user_id = decoded["user_id"];

		with connection.cursor() as cursor:
			sql = """SELECT jwt
						FROM use_jwt
						WHERE users_id = %s;"""

			cursor.execute(sql,(user_id));
			results = cursor.fetchone();
			use_jwt = results["jwt"];

		# print(use_jwt == str_jwt, "use_jwt:" + use_jwt + "str_jwt:" + str_jwt);

	except Exception as e:
		print("JwtError:" , str(e))
		state = False;

	try:
		if str_jwt != use_jwt:
			raise UnauthenticationError(str_jwt);
			
	except UnauthenticationError as e:
		print("UnauthenticationError",str(e));
		state = False;
		user_id = "";

	return state, user_id;