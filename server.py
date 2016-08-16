from bottle import app, run, route, static_file, redirect, request, response, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;
from config.db import connection;
from config.session import session_opts;
import json;
import config.router as root;
from app.modules.auth import req_auth, sign_out;

app = SessionMiddleware(app(), session_opts);

@route("/")
def index():
	return static_file("index.html",root="./static");

@route("/static/<filename:path>")
def static_file_path(filename):
	return static_file(filename, root="./static");

@route("/auth_state")
def check_auth_state():
	request_jwt = request.forms.get("jwt");

@route("/sign")
def twitter_api():
	auth_url, request_oauth_token, request_oauth_token_secret = twitter.generate_oauth_url();
	data = {"request_oauth_token": request_oauth_token, "request_oauth_token_secret": request_oauth_token_secret};

	session = request.environ.get("beaker.session");
	session["twitter"] = data;

	r = HTTPResponse(status = 200, body = {"url": auth_url});
	
	return r;

from app.modules.jwt import generate_jwt, is_valid_jwt;
import app.api.user as user_modules;

@route('/callback')
def twitter_callback():
    session = request.environ.get("beaker.session");

    oauth_verifier = request.query['oauth_verifier']

    access_token, access_token_secret = twitter.get_access_token(
        session["twitter"]["request_oauth_token"],
    	session["twitter"]["request_oauth_token_secret"],
        oauth_verifier)

    twitter_user = twitter.verify_credentials(access_token, access_token_secret)
    int(twitter_user.id);

    with connection.cursor() as cursor:
    	sql = """SELECT user_id FROM users
    				WHERE user_id = %s"""

    	cursor.execute(sql,(twitter_user.id));
    	results = cursor.fetchone();
       	
    	if results is None:
    		with connection.cursor() as cursor:
		    	sql = """INSERT INTO users (user_id, user_name) 
		    				SELECT %s,%s
		    				FROM dual 
		    				WHERE NOT EXISTS (
		    					SELECT * 
		    					FROM users 
		    					WHERE user_id = %s
		    				)"""

		    	cursor.execute(sql,(twitter_user.id,twitter_user.screen_name,twitter_user.id))
		    	# connection.commit(twitter_user.id);
		    	connection.commit();
		    	
		    	jwt = generate_jwt(twitter_user.id);
    	else:
    		user_id = results["user_id"];
    		jwt = generate_jwt(user_id);


    redirect(root.SERVER_URL +"?jwt="+ jwt);

@route("/check_jwt", method='POST')
def check_jwt () :
	jwt = request.json["payload"];
	state, user_id = is_valid_jwt(jwt);
	user_info = user_modules.get_user_info(user_id);

	if state:
		dict_data = {
			"status_code": 200,
			"status_message": "SUCCESS",
			"data": {
				"jwt": jwt,
				"user":{
					"user_id": user_id,
					"user_name": user_info["user_name"],
				},
				"items":[]
			}
		}
		json_data = json.dumps(dict_data);
		r = HTTPResponse(status=200,body=json_data);
	else :
		dict_data = {
			"status_code": 401,
			"status_message": "UNAUTHORIZED",
		}
		json_data = json.dumps(dict_data);
		r = HTTPResponse(status=401,body=json_data);

	return r;

@route("/goal",method="get")
@route("/goal",method="post")
@route("/goal",method="put")
@route("/goal",method="delete")
@req_auth
def curd_goal (user_id) :
	method = request.method
	payload = request.json["payload"];

	if method == "GET":
		pass;
	elif method == "POST":
		pass;

	elif method == "PUT":
		pass;
	
	elif method == "DELETE":
		pass;

route("/sign_out", method="post")(sign_out);
	
run(app=app,host="192.168.11.3",port="1234",debug=True, reloader=True);