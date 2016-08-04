from bottle import app, run, route, static_file, redirect, request, response, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;

import pymysql.cursors; 
from app.env.secret import DATABASE_PASSWORD;

import datetime;
import time;
import jwt;
import hmac;


#database
connection = pymysql.connect(
	host= "localhost",
	user= "root",
	password= DATABASE_PASSWORD,
	db="marshmallow",
	charset="utf8",
	cursorclass= pymysql.cursors.DictCursor
);

#session store
session_opts = {
	"session.type": "file",
	"session.data_dir": "./app/env/data",
	"session.cookie_expires": True,
    "session.auto": True
};

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
		    	connection.commit(twitter_user.id);
		    	
		    	jwt = generate_jwt(twitter_user.id);
    	else:
    		user_id = results["user_id"];
    		jwt = generate_jwt(user_id);


    redirect("/?jwt="+ jwt);
    

def generate_jwt(user_id):
	with open("./app/env/private.pem","rb") as f:
		private_pem = f.read();

	exp = datetime.datetime.utcnow() + datetime.timedelta(days = 7);
	secret = hmac.new(private_pem,None,"sha256").digest();

	encoded = jwt.encode({"exp": exp,"user_id": user_id}, secret, algorithm="HS256").decode('utf-8');
	return encoded;


# decoded = jwt.decode(encoded, secret, verify=True);

run(app=app,host="localhost",port="1234",debug=True, reloader=True);
