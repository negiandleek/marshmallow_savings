#!/user/bin/env python
#-*- coding:utf-8 -*-
import tweepy;
import app.env.secret as private;

CALLBACK_URL = "http://192.168.11.11:4321/callback"

def twitter_api(access_token = None, access_token_secret = None, with_callback_url = False):
    if with_callback_url:
        auth = tweepy.OAuthHandler(
            consumer_key = private.SECRET_CONSUMER_KEY,
            consumer_secret = private.SECRET_CONSUMER_SECRET,
            callback_url = CALLBACK_URL)
    else:
        auth = tweepy.OAuthHandler(
            consumer_key = private.SECRET_CONSUMER_KEY,
            consumer_secret = private.SECRET_CONSUMER_SECRET)

    if access_token is not None and access_token_secret is not None:
        auth.set_access_token(access_token, access_token_secret)

    return tweepy.API(auth)


def generate_oauth_url():
    oauth = tweepy.OAuthHandler(private.SECRET_CONSUMER_KEY,private.SECRET_CONSUMER_SECRET, CALLBACK_URL);
    redirect_url = oauth.get_authorization_url(signin_with_twitter = True);
    request_token = oauth.request_token;
    
    return redirect_url, request_token["oauth_token"], request_token["oauth_token_secret"]

def get_access_token(request_token_key, request_token_secret, oauth_verifier):
	oauth_handler = tweepy.OAuthHandler(private.SECRET_CONSUMER_KEY,private.SECRET_CONSUMER_SECRET)
	oauth_handler.request_token = {
		"oauth_token": request_token_key,
		"oauth_token_secret": request_token_secret,
		"oauth_callback_confirmed": True
	}
	oauth_handler.get_access_token(oauth_verifier);

	return oauth_handler.access_token, oauth_handler.access_token_secret;

def verify_credentials(access_token, access_token_secret):
    api = twitter_api(access_token, access_token_secret)
    
    return api.verify_credentials();