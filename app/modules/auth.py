from bottle import redirect;
from app.modules import jwt;

class Auth:
	def req_auth (jwt):
		status, user_id = jwt.is_valid_jwt(jwt);

		if status:
			return status, user_id;
		else :
			redirect("./");

	def sign_out (jwt):
		