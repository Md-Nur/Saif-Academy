# from app.config.db import client
from fastapi import APIRouter, HTTPException, Response
from app.models.user_model import User
from app.schemas.user_schema import users_entity, user_entity
from app.utils.pwdcypt import get_password_hash, verify_password
from app.utils.tokens import create_token


user_router = APIRouter()
# users_db = client.saif_academy.users


@user_router.get("/users")
def get_all_users():
    # return users_entity(users_db.find())
    pass


@user_router.get("/users/{user_id}")
def get_user(user_id: str):
    return user_entity(users_db.find_one({"_id": user_id}))


@user_router.post("/signup")
def create_user(user, res: Response):
    print(user)
    # check if user already exists
    # if users_db.find_one({"phone": user.phone}):
        # raise HTTPException(status_code=400, detail="User already exists")

    # Hashi Password before saving
    user.password = get_password_hash(user.password)

    # Save user to database
    try:
        # inserted_user = users_db.insert_one(User.model_dump(user))
        pass
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # if not inserted_user:
    #     raise HTTPException(status_code=400, detail="User not created")

    res.status_code = 201
    return {"message": "User created successfully. Please wait for admin approval"}


@user_router.post("/login")
def login(user: dict, response: Response) -> dict:
    if not user["phone"] or not user["password"]:
        raise HTTPException(status_code=400, detail="Invalid phone or password")

    # user_data = users_db.find_one({"phone": user["phone"]})

    # check if user exists and is approved
    # if not user_data:
    #     raise HTTPException(status_code=400, detail="User not found")
    # if not user_data["is_approved"]:
    #     raise HTTPException(status_code=400, detail="User not approved")

    # check if password is correct
    # if not verify_password(user["password"], user_data["password"]):
    #     raise HTTPException(status_code=400, detail="Invalid password")

    # create access and refresh tokens
    # token_data = {"id": str(user_data["_id"])}
    # access_token = create_token(token_data, "access")
    # refresh_token = create_token(token_data, "refresh")

    # save refresh token to database
    try:
        # updated_user = users_db.find_one_and_update(
        #     {"_id": user_data["_id"]},
        #     {"$set": {"refresh_token": refresh_token}},
        #     return_document=True
        # )
        # print(updated_user)
        pass
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    response.status_code = 205
    response.set_cookie = {
        "key": "access_token",
        # "value": access_token,
        "httponly": True,
        "secure": True,
    }
    # return {"ei khane":"he he"}
    response.set_cookie = {
        "key": "refresh_token",
        # "value": refresh_token,
        "httponly": True,
        "secure": True,
    }

    return {
        "message": "Login successful",
        # "access_token": access_token,
        # "refresh_token": refresh_token,
        # "data": user_entity(updated_user),
    }
