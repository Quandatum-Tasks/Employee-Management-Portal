# Employee-Management-Portal(React + Django + MySQL)

This is a full-stack Employee portal System built using:

React (Frontend)

Django REST Framework (Backend)

MySQL (Database)

Users can Register, Login, and Manage Employees (Add, Edit, Delete, View).

### Features

User Registration & Login (Authentication)

Add / Edit / Delete / View Employees

Glassmorphism UI Design (Modern Dashboard)

Secured API (Only logged-in users can access employees page)

React Frontend + Django API + MySQL DB

### Setup Instructions
### 1. Clone Repository
Create a folder → mkdir folder name

cd folder name

git clone https://github.com/Quandatum-Tasks/Employee-Management-Portal.git

cd Employee-Management-Portal

### Backend Setup (Django)

### 2. Create Virtual Environment & Install Dependencies

cd backend

python -m venv venv

venv\Scripts\activate       # for Windows

If not present, install manually:

pip install django djangorestframework mysqlclient django-cors-headers

### 3. Configure MySQL Database

### Create a database in MySQL:

CREATE DATABASE employee_db;


### Update backend/settings.py

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'employee_db',
        'USER': 'root',
        'PASSWORD': 'your_mysql_password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```


### 4. Run Backend
python manage.py makemigrations

python manage.py migrate

python manage.py runserver


Backend Runs At:
http://127.0.0.1:8000/

### Frontend Setup (React)
### 5. Install Dependencies

Open a new terminal (do not stop backend):

cd frontend

npm install

### 6. Start Frontend

npm start


Frontend Runs At:
http://localhost:3000/


## API Endpoints

### Base URL (Local):

http://127.0.0.1:8000/api/

### Authentication & Users
```python
Method    Endpoint        Full URL                                           Description                   Body
GET       /message/       http://127.0.0.1:8000/api/message/                 Welcome message               —
POST      /register/      http://127.0.0.1:8000/api/register/                Register a new user           { name, email, password }
POST      /login/         http://127.0.0.1:8000/api/login/                   Login user                    { email, password }
GET       /users/         http://127.0.0.1:8000/api/users/                   Get all registered users      —
```

### Employee Management
```python
Method    Endpoint              Full URL                                            Description                       Body
GET       /employees/           http://127.0.0.1:8000/api/employees/                Get all employees (latest first)  —
POST      /employees/           http://127.0.0.1:8000/api/employees/                Add a new employee                Employee JSON data
PUT       /employees/<id>/      http://127.0.0.1:8000/api/employees/1/              Update employee by ID             Partial or full employee data
DELETE    /employees/<id>/      http://127.0.0.1:8000/api/employees/1/              Delete employee by ID             —

```

### Sample Employee JSON
```python
{
  "name": "AAA",
  "email": "AAA@example.com",
  "role": "Software Engineer",
  "salary": 60000,
  "joining_date": "2025-11-08",
  "status": "Active"
}
```
