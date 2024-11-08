import pymongo

uri = 'mongodb+srv://finance:finance@financetracker.fq6ng.mongodb.net/'
# mongodb+srv://finance:finance@financetracker.mongodb.net/<database>?retryWrites=true&w=majority

client = pymongo.MongoClient(uri)
db = client['financetracker']