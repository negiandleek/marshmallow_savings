import datetime;
import hmac;
import jwt;

with open("./app/env/private.pem","rb") as f:
		private_pem = f.read();
secret = hmac.new(private_pem,None,"sha256").digest();

def generate_jwt(user_id):
	exp = datetime.datetime.utcnow() + datetime.timedelta(days = 7);
	encoded = jwt.encode({"exp": exp,"user_id": user_id}, secret, algorithm="HS256").decode('utf-8');
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

		# get user info
		reflesh_jwt = generate_jwt(user_id);
	except Exception as e:
		print(e.args)
		state = False;
	
	return state, reflesh_jwt, user_id;