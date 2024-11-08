from db_connnection import db
from datetime import datetime

user_collection = db["users"]
entrie_collection = db["entries"]


class UserModel:
    def __init__(self, username, email, password, profileimage=None):
        self.username = username
        self.email = email
        self.password = password
        self.profileimage = profileimage
        self.entries = []
        self.created_at = datetime.now()  ## pylint: disable=no-member
        self.updated_at = datetime.now()  ## pylint: disable=no-member


class EntrieModel:
    def __init__(self, userId, entry_type, amount, category):
        self.userId = userId
        self.entry_type = entry_type
        self.amount = amount
        self.date = datetime.now().isoformat()
        self.category = category if entry_type == "expense" else None
