from bottle import app, run, route, static_file, redirect, request, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;
import time;
session_opts = {
	"session.type": "file",
	"session.data_dir": "./data",
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
	auth_url, request_token_key, request_token_secret = twitter.generate_oauth_url();
	data = {"token_key": request_token_key, "token_secret": request_token_secret};
	session = request.environ.get("beaker.session");
	session["twitter"] = data;
	
	#redirect(auth_url);

@route('/callback')
def twitter_callback():
    session = request.environ.get("beaker.session");

    oauth_verifier = request.query['oauth_verifier']

    access_token_key, access_token_secret = twitter.get_access_token(
        session["twitter"]["token_key"],
    	session["twitter"]["token_secret"],
        oauth_verifier)

    twitter_user = twitter.verify_credentials(access_token_key, access_token_secret)
    print(twitter_user);

    return static_file("callback.html", root="./static");

# @route("/hoge")
# def sample () :
# 	sex = request.query.payload;
# 	print(sex);
# 	print(sex);
# 	if sex == "woman":
# 		r = HTTPResponse(status=200, body={"sex":"sex is woman"});
# 		r.set_header("Content-Type", "application/json");

# 		return r
# 	elif sex == "man":
# 		r = HTTPResponse(status=200, body={"sex":"sex is man"})
# 		r.set_header("Content-Type", "application/json");
# 		time.sleep(1.0);
# 		return r;
# 	else :
# 		r = HTTPResponse(status=200, body={"sex":"sex is minority"})
# 		r.set_header("Content-Type", "application/json");

# 		return r;

run(app=app,host="localhost",port="1234",debug=True, reloader=True); 