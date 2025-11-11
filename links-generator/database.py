from pymongo import MongoClient

mongo_url = "mongodb://localhost:27017/"
db_name = "bitly_clone_db1"
collection_name = "links"
ttl_seconds = 3600

client = MongoClient(mongo_url)
db = client[db_name]
collection = db[collection_name]
collection.create_index("id", unique=True)
collection.create_index("creation_time", expireAfterSeconds=ttl_seconds)


"""
- links collection schema:
id (indexed, unique)(a-z,a-z,digit)
url
creation_time (indexed, adding expiration)
"""


def id_exists(id):
    row = collection.find_one({"id": id})
    return row != None


def add_link(id, url, creation_time):
    document = {
        "id": id,
        "url": url,
        "creation_time": creation_time
    }
    collection.insert_one(document)




def get_links(limit):
    cursor = collection.find({}, {"_id": 0}).limit(limit)
    rows = list(cursor)
    for row in rows:
        row["creation_time"] = row["creation_time"].strftime("%H:%M:%S %d/%m/%y")
    return rows