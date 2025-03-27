from app.models.user_model import User


def user_entity(user:User) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "s_class": user["s_class"],
        "enrolled_batches": user["enrolled_batches"],
        "avatar": user["avatar"],
        "is_approved": user["is_approved"],
        "user_type": user["user_type"],
        "refresh_token": user["refresh_token"],
    }


def users_entity(users) -> list:
    return [user_entity(user) for user in users]
