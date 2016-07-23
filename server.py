from bottle import app, run, route, static_file, redirect, request, response, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;

import pymysql.cursors; 
from app.env.secret import DATABASE_PASSWORD;

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
    	sql = """SELECT id FROM users
    				WHERE user_id = %s"""

    	cursor.execute(sql,(twitter_user.id));
    	results = cursor.fetchone();
    	print(type(results));
    	print(results);
    	if results is None:
    		pass
    	else:
    		print("result"+ "...........bad");

    with connection.cursor() as cursor:
    	sql = """INSERT INTO users (user_id, user_name) 
    				SELECT %s,%s
    				FROM dual 
    				WHERE NOT EXISTS (
    					SELECT * 
    					FROM users 
    					WHERE user_id = %s
    				)"""

    	cursor.execute(sql,(twitter_user.id,twitter_user.screen_name,twitter_user.id));
    	connection.commit();
		
    return static_file("index.html", root="./static");

run(app=app,host="localhost",port="1234",debug=True, reloader=True);
