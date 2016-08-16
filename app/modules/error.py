class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class UnauthenticationError(Error):
	def __init__(self, jwt):
		self.jwt = jwt;

	def __str__ (self):
		return self.jwt;