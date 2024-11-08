from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserModel, EntrieModel, user_collection, entrie_collection
from bson import ObjectId
from datetime import datetime
import json
import base64


@csrf_exempt
def Signup(request):
    if request.method == "POST":
        try:
            username = request.POST.get("username")
            email = request.POST.get("email")
            password = request.POST.get("password")
            profileimage = request.FILES.get("profileimage")
            if not username or not email or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)
            check_user = user_collection.find_one({"username": username})
            if check_user:
                return JsonResponse({"error": "username already exists"}, status=400)
            profile_image_binary = None
            if profileimage:
                profile_image_binary = profileimage.read()  # Read the image file
            new_user = UserModel(username, email, password, profile_image_binary)
            user_collection.insert_one(new_user.__dict__)

            response_data = {
                "message": "User Created Successfully",
                "user": {
                    "username": new_user.username,
                    "email": new_user.email,
                    "created_at": new_user.created_at,
                    "updated_at": new_user.updated_at,
                },
            }
            return JsonResponse(response_data, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>")


@csrf_exempt
def Login(request):
    if request.method == "POST":
        try:
            email = request.POST.get("email")
            password = request.POST.get("password")
            if not email or not password:
                return JsonResponse({"error": "Email and password must be required"})
            if email:
                user = user_collection.find_one({"email": email})
                if not user:
                    return JsonResponse({"error": "Invalid email"}, status=401)
            if password:
                if user["password"] != password:
                    return JsonResponse({"error": "Invalid password"}, status=401)
       
            response_data = {
                "message": "Login Successful",
                "user": {
                    "id": str(user["_id"]),  # Convert ObjectId to string
                    "email": user["email"],
                    "username": user["username"]
                }
            }
            return JsonResponse({"user": response_data}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>")


def GetUserData(request, userId):
    if request.method == "GET":
        try:
            user_id = ObjectId(userId)
            user = user_collection.find_one({"_id": user_id})
            if user:
                if isinstance(user.get("profileimage"), bytes):
                    profile_image = base64.b64encode(user["profileimage"]).decode(
                        "utf-8"
                    )
                else:
                    profile_image = user["profileimage"]
                response_data = {
                    "username": user["username"],
                    "email": user["email"],
                    "profileimage": profile_image,
                    "created_at": user["created_at"],
                    "updated_at": user["updated_at"],
                }
                return JsonResponse({"user": response_data}, status=200)
            return JsonResponse({"error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>")


@csrf_exempt
def AddIncome(request):
    if request.method == "POST":
        try:
            userId = request.POST.get("userId")
            amount = request.POST.get("amount")
            if not userId or not amount:
                return JsonResponse(
                    {"error": "User ID and amount are required"}, status=400
                )
            income_entry = EntrieModel(
                userId=userId, entry_type="income", amount=amount, category=None
            )
            entrie_id = entrie_collection.insert_one(income_entry.__dict__).inserted_id
            user_collection.update_one(
                {"_id": ObjectId(userId)}, {"$push": {"entries": entrie_id}}
            )
            response_data = {
                "message": "Income added successfully",
                "entry": {
                    "entry_id": str(entrie_id),
                    "entry_type": "income",
                    "amount": amount,
                    "category": None,
                },
            }
            return JsonResponse(response_data, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return HttpResponse("<p>Invalid request method</p>", status=405)


@csrf_exempt
def AddExpense(request):
    if request.method == "POST":
        try:
            userId = request.POST.get("userId")
            amount = request.POST.get("amount")
            category = request.POST.get("category")
            if not userId or not amount or not category:
                return JsonResponse(
                    {"error": "User ID, amount and category are required"}, status=400
                )
            expense_entrie = EntrieModel(
                userId=userId, amount=amount, category=category, entry_type="expense"
            )
            entrie_id = entrie_collection.insert_one(
                expense_entrie.__dict__
            ).inserted_id
            user_collection.update_one(
                {"_id": ObjectId(userId)}, {"$push": {"entries": entrie_id}}
            )
            response_data = {
                "message": "Expense added successfully",
                "entry": {
                    "entry_id": str(entrie_id),
                    "entry_type": "expense",
                    "amount": amount,
                    "category": category,
                },
            }
            return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)


def GetUserEntries(request, userId):
    if request.method == "GET":
        try:
            entries = entrie_collection.find({"userId": userId})
            entry_list = []
            for entry in entries:
                entry_list.append(
                    {
                        "entry_id": str(entry["_id"]),
                        "entry_type": entry["entry_type"],
                        "amount": entry["amount"],
                        "category": entry["category"],
                        "date": entry["date"],
                    }
                )
            return JsonResponse({"message": "ABC", "entries": entry_list}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)


@csrf_exempt
def UpdateExpenseEntrie(request, entry_id):
    if request.method == "POST":
        try:
            entry_type = "expense"
            amount = request.POST.get("amount")
            category = request.POST.get("category")
            date = datetime.now().isoformat()
            update_data = {
                "entry_type": entry_type,
                "date": date,
            }
            if amount is not None:
                update_data["amount"] = amount
            if category is not None:
                update_data["category"] = category
            if not update_data:
                return JsonResponse(
                    {"error": "No data is provided to update"}, status=400
                )
            entry = ObjectId(entry_id)
            result = entrie_collection.update_one({"_id": entry}, {"$set": update_data})
            if result.modified_count == 0:
                return JsonResponse(
                    {"error": "Entry not found or no changes made"}, status=404
                )
            response = {
                "message": "Entry updated successfully",
                "modified_count": result.modified_count,
            }

            return JsonResponse(response, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)


@csrf_exempt
def UpdateIncomeEntrie(request, entry_id):
    if request.method == "POST":
        try:
            entry_type = "income"
            amount = request.POST.get("amount")
            category = None
            date = datetime.now().isoformat()

            # Prepare update data
            update_data = {
                "entry_type": entry_type,
                "date": date,
                "category": category,
            }

            if amount is not None:
                update_data["amount"] = amount

            if not update_data:
                return JsonResponse(
                    {"error": "No data is provided to update"}, status=400
                )

            # Update entry in database
            entry = ObjectId(entry_id)
            result = entrie_collection.update_one({"_id": entry}, {"$set": update_data})

            # Check if any document was modified
            if result.modified_count == 0:
                return JsonResponse(
                    {"error": "Entry not found or no changes made"}, status=404
                )

            # Construct response data
            response = {
                "message": "Entry updated successfully",
                "modified_count": result.modified_count,
            }

            return JsonResponse(response, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)


@csrf_exempt
def DeleteEntrie(request, entry_id):
    if request.method == "DELETE":
        try:
            entry_id = ObjectId(entry_id)
            entry = entrie_collection.find_one({"_id": entry_id})
            userId = entry["userId"]
            deleted_entry = entrie_collection.delete_one({"_id": entry_id})
            if deleted_entry.deleted_count == 0:
                return JsonResponse({"error": "Entry not found"}, status=404)
            user_collection.update_one(
                {"_id": ObjectId(userId)}, {"$pull": {"entries": entry_id}}
            )
            return JsonResponse({"message": "Entry deleted successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)


def GetSummary(request, userId):
    if request.method == "GET":
        try:
            income_total = sum(
                float(
                    entry["amount"]
                )  # Convert to float to handle potential decimal values
                for entry in entrie_collection.find(
                    {"userId": userId, "entry_type": "income"}
                )
            )
            expense_total = sum(
                float(
                    entry["amount"]
                )  # Convert to float to handle potential decimal values
                for entry in entrie_collection.find(
                    {"userId": userId, "entry_type": "expense"}
                )
            )
            balance = income_total - expense_total

            summary = {
                "total_income": income_total,
                "total_expenses": expense_total,
                "balance": balance,
            }
            return JsonResponse({"summary": summary}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse("<p>Invalid request method</p>", status=405)
