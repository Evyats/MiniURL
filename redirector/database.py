from pymongo import MongoClient

mongo_url = "mongodb://localhost:27017/"
db_name = "bitly_clone_db1"
collection_name = "links"

client = MongoClient(mongo_url)
db = client[db_name]
collection = db[collection_name]

def get_long_url(id: str):
    row = collection.find_one({"id": id})
    if not row: raise KeyError()
    return row["url"]