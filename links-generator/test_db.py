from pymongo import MongoClient


db_name = "bitly_clone"
collection_name = "links" # collection is like the analogy for sql table

client = MongoClient("mongodb://localhost:27017/")
db = client[db_name]
links = db[collection_name]






def insert_row(json_row):
    links.insert_one(json_row)




def find(query):    
    res = links.find_one(query)
    return res["original_url"]








def print_all():
    for row in links.find():
        print(row)



if __name__ == "__main__":
    pass
    # doc = {"short_id": "abc124", "original_url": "https://google.com"}
    # query = {"short_id": "abc124"}
    # insert_row(doc)
    # print(find(query))


    row = links.find_one({"short_id": "evyats"})
    print(row)
    doc = {"short_id": "evyats", "original_url": "https://evyats.com"}
    links.insert_one(doc)
    row = links.find_one({"short_id": "evyats"})
    print(row)
    links.update_one({"short_id": "evyats"}, {"$set": {"original_url": "https://evyatsUPDATED.com"}})
    print(row)
    row = links.find_one({"short_id": "evyats"})
    print(row)
    # print_all()
    
    '''
    find
    insert
    update
    delete
    '''
