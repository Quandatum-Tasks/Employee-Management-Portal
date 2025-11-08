from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AppUser
from .serializers import AppUserSerializer
from django.contrib.auth.hashers import make_password, check_password
from .models import Employee
from .serializers import EmployeeSerializer

class MessageView(APIView):
    def get(self, request):
        return Response({"message": "Welcome Interns"})

class RegisterView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        if AppUser.objects.filter(email=email).exists():
            return Response({"error":"Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = AppUser.objects.create(
            name=name, email=email, password=make_password(password)
        )
        return Response({"message":"User created"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = AppUser.objects.get(email=email)
        except AppUser.DoesNotExist:
            return Response({"error":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        if check_password(password, user.password):
            serializer = AppUserSerializer(user)
            return Response({"message":"Login success","user":serializer.data})
        return Response({"error":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class UsersListView(APIView):
    def get(self, request):
        users = AppUser.objects.all()
        serializer = AppUserSerializer(users, many=True)
        return Response(serializer.data)



class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = Employee.objects.all().order_by('-id')
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeUpdateDeleteView(APIView):
    def put(self, request, employee_id):
        try:
            employee = Employee.objects.get(id=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(id=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        employee.delete()
        return Response({"message": "Employee deleted successfully"})
