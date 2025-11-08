from django.urls import path
from .views import (
    MessageView, RegisterView, LoginView, UsersListView,
    EmployeeListCreateView, EmployeeUpdateDeleteView
)

urlpatterns = [
    path('message/', MessageView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('users/', UsersListView.as_view()),

    # Employee URLs
    path('employees/', EmployeeListCreateView.as_view()),
    path('employees/<int:employee_id>/', EmployeeUpdateDeleteView.as_view()),
]

