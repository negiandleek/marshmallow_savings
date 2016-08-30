from bottle import app, run, route, static_file, redirect, request, response, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;
from config.db import connection;
from config.session import session_opts;
import json;
import config.router as root;
from app.modules.auth import req_auth, sign_out;

app = SessionMiddleware(app(), session_opts);

#データベース、変数を複数にするかどうか命名規則を整える

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
	try:
		state, user_id = is_valid_jwt(jwt);

	except:
		json_data = {"message":"FALSE","data": "authentication error from jwt"};
		encoded_json = json.dumps(json_data);
		
		r = HTTPResponse(status=401,body=encoded_json,content_type = "application/json");
		return r;

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

from app.api.goal import get_active_goal;
from app.api.todo import read_todo;

@route("/get_doing", method="post")
@req_auth 
def read_doing(user_id):
	goal_results = get_active_goal(user_id);
	todo_results = read_todo(goal_results["id"]);

	json_data = {"goal": goal_results,"todos": todo_results};
	response_message = {"api":{"status": "200", "message": "SUCCESS"}};

	json_data.update(response_message);

	encoded_json = json.dumps(json_data);

	r = HTTPResponse(state=200, body=encoded_json, content_type="application/json");
	return r;

# payloadの内容で分けようかな。
@route("/get_goal",method="post")
@req_auth
def read_goal (user_id) :
	results = get_active_goal(user_id);

	r = HTTPResponse(state=200,body="");
	return r;

@route("/goal",method="post")
@route("/goal",method="put")
@route("/goal",method="delete")
@req_auth
def cud_goal (user_id) :
	method = request.method
	payload = request.json["payload"];

	if method == "POST":
		pass;

	elif method == "PUT":
		pass;
	
	elif method == "DELETE":
		pass;

from app.api.todo import create_todo,update_todo;

@route("/get_todo",method="post")
@req_auth
def get_todo (user_id) :
	pass;

@route("/todo", method = "post")
@route("/todo", method = "put")
@route("/todo", method = "delete")
@req_auth
def cud_todo (user_id):
	method = request.method
	payload = request.json["payload"];

	if method == "POST":
		goal_id = payload["goal_id"];
		value = payload["value"];

		try:
			todo_results = create_todo(goal_id,value)
		except Exception as e:
			print(str(e));

			json_data = {
				"response_message": {"api":{"status": "200", "message": "FALSE", "data": str(e)}}
			};
			encode_json = json.dumps(json_data);
			
			r = HTTPResponse(state=200, body=encode_json, content_type = "application/json");
			return r;

		json_data = {"todos": todo_results};
		api_message = {"api":{"status": "200", "message": "SUCCESS", "data": "add todo success"}};
		
		json_data.update(api_message);
		encode_json = json.dumps(json_data);

		r = HTTPResponse(status=200, body=encode_json, content_type = "application/json");
		return r;

	elif method == "PUT":
		todo_id = payload["todo_id"];
		value = payload["value"];

		try:
			update_todo(todo_id, value);
		except Exception as e:
			print(str(e));

			json_data = {
				"response_message": {"api":{"status": "200", "message": "FALSE", "data": str(e)}}
			};
			encode_json = json.dumps(json_data);
			
			r = HTTPResponse(state=200, body=encode_json, content_type = "application/json");
			return r;

		api_message = {"api":{"status": "200", "message": "SUCCESS", "data": "update todo success"}};
		encode_json = json.dumps(api_message);

		r = HTTPResponse(status=200, body=encode_json, content_type = "application/json");
		return r;

	elif method == "DELETE":
		pass;

route("/sign_out", method="post")(sign_out);
	
run(app=app,host="192.168.11.3",port="1234",debug=True, reloader=True);