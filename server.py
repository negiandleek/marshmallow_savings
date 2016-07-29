from bottle import app, run, route, static_file, redirect, request, response, HTTPResponse;
from beaker.middleware import SessionMiddleware;
from app.modules import twitter;

import pymysql.cursors; 
from app.env.secret import DATABASE_PASSWORD;

import jwt;
from Crypto.PublicKey import RSA
from Crypto import Random

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.x509 import load_pem_x509_certificate

import pprint


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
	private_key = rsa.generate_private_key(
			public_exponent=65537,
		    key_size=2048,
		    backend=default_backend()
		);

	private_pem = private_key.private_bytes(
		    encoding=serialization.Encoding.PEM,
		   	format=serialization.PrivateFormat.TraditionalOpenSSL,
		  	encryption_algorithm=serialization.NoEncryption()
		);

	public_key = private_key.public_key();
	public_pem = public_key.public_bytes(
			encoding=serialization.Encoding.PEM,
			format=serialization.PublicFormat.SubjectPublicKeyInfo
		);

	print(public_pem);
	key = load_pem_x509_certificate(private_key, default_backend())
	print(key.public_key())
	# random_func = Random.new().read;
	# rsa = RSA.generate(1024,random_func);
	# private_pem = rsa.exportKey(format="PEM",passphrase=None);

	# with open("./app/env/private.pem","wb") as f:
	# 	f.write(private_pem);

	# public_pem = rsa.publickey().exportKey();
	# with open("./app/env/public.pem","wb") as f:
	# 	f.write(public_pem);

	# private_key_str = open("./app/env/private.pem","rb").read();
	# private_key = RSA.importKey(private_key_str).exportKey();
	encoded = jwt.encode({'some': 'payload'}, private_pem, algorithm='HS256');

	# public_key_str = open("./app/env/public.pem","rb").read();
	# public_key = RSA.importKey(public_key_str).exportKey();

	decoded = jwt.decode(encoded, key = private_pem, verify=True);
	print(decoded)
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
		    	
		    	jwt = generate_jwt();
    	else:
    		user_id = results["user_id"];
    		jwt = generate_jwt(user_id);

    r = HTTPResponse(status=200, body={jwt: jwt},content_type="application/json; charset=utf8");

def generate_jwt(user_id):
	_rsa_public_key = open('./app/env/id_rsa', 'r').read();
	rsa_public_key = RSA.importKey(_rsa_public_key);
	key = rsa_public_key;

	encoded = jwt.encode({"some": "payload"},key,algorithm='HS256');


run(app=app,host="localhost",port="1234",debug=True, reloader=True);
