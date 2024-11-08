from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.Signup, name="signup"),
    path("login/", views.Login, name="Login"),
    path("getUserData/<userId>", views.GetUserData, name="GetUserData"),
    path("addIncome/", views.AddIncome, name="AddIncome"),
    path("addExpense/", views.AddExpense, name="AddExpense"),
    path("getUserEntries/<userId>", views.GetUserEntries, name="getUserEntries"),
    path(
        "updateExpenseEntrie/<entry_id>",
        views.UpdateExpenseEntrie,
        name="updateExpenseEntrie",
    ),
    path(
        "updateIncomeEntrie/<entry_id>",
        views.UpdateIncomeEntrie,
        name="updateIncomeEntrie",
    ),
    path(
        "deleteEntrie/<entry_id>",
        views.DeleteEntrie,
        name="deleteEntrie",
    ),
    path(
        "getSummary/<userId>",
        views.GetSummary,
        name="getSummary",
    ),
]
