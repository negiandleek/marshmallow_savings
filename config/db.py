import pymysql; 
from app.env.secret import DATABASE_PASSWORD;

connection = pymysql.connect(
	host= "localhost",
	user= "root",
	password= DATABASE_PASSWORD,
	db="marshmallow",
	charset="utf8",
	cursorclass= pymysql.cursors.DictCursor
);