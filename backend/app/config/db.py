from pymongo import MongoClient
from os import environ


client = MongoClient(environ.get("MONGO_URI"))

try:
    client.admin.command("ping")
    print("MongoDB Connected successfully")

except Exception as e:
    raise Exception("The following error occurred: ", e)
