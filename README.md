# Presentation Project

## Project Overview

This project implements a simple full-stack user authentication system with a protected dashboard.
It was built as part of a technical assessment to demonstrate backend and frontend integration,
basic security practices, and clear code structure.

The application allows users to register, log in, and access a dashboard that is only available
to authenticated users.

## Tech Stack

**Backend**
- Django
- Django REST Framework
- SimpleJWT (JWT authentication)

**Frontend**
- React
- Vite
- React Router

**Database**
- SQLite (for development and demonstration purposes)


## Authentication Flow

- Users register with an email and password
- Passwords are securely hashed using Django’s built-in password hashing
- Users log in using JWT-based authentication
- Access and refresh tokens are issued on login
- The frontend stores the access token and manages authentication state using React Context
- Protected routes verify authentication state before allowing access
- Logging out clears stored tokens and resets authentication state

## API Endpoints (Summary)

- `POST /api/users/register/` – Register a new user
- `POST /api/users/token/` – Login and obtain JWT tokens
- `GET /api/users/me` – Get authenticated user details (protected)
## Assumptions & Design Decisions

- JWT authentication was chosen to keep the backend stateless
- Email is used as the unique user identifier
- Validation is enforced at both the serializer and database levels
- The UI is intentionally minimal to focus on correctness and security
- SQLite is used for simplicity and ease of setup

## Improvements With More Time

- Store JWTs in HTTP-only cookies for improved security
- Add email verification on registration
- Add forgot password functionality
- Implement refresh token rotation
- Add rate limiting to authentication endpoints
- Improve frontend UX and form validation
- Add more comprehensive test coverage

## Quickstart (Backend)

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd presentation
   ```

2. Navigate to the backend folder:
   ```bash
   cd backend
   ```

3. Create a `.env` file in the `backend/` directory **before** installing dependencies or running migrations. Example:
   ```env
   SECRET_KEY=your_secret_key  # Generate one with the command below
   DEBUG=True
   ```
   To generate a secure secret key, run:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

4. Create a virtual environment:
   ```bash
   python -m venv venv
   # Activate:
   # Windows:
   venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Apply migrations:
   ```bash
   python manage.py migrate
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

8. (Optional) To access the Django admin panel and view users:
   - Create a superuser if you haven't already:
     ```bash
     python manage.py createsuperuser
     ```
   - Start the development server (if not already running):
     ```bash
     python manage.py runserver
     ```
   - Visit the Django admin at: http://localhost:8000/admin/
   - Log in with your superuser credentials. You can view and manage users from the Users section.

---

## Frontend Setup (React + Vite)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Create a `.env` file in the `frontend/` directory with:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev

   ```

---


## Running Tests

To run the backend test suite:
```bash
cd backend
python manage.py test
```

## Usage
- Backend runs at http://localhost:8000
- Frontend runs at http://localhost:5173 (default Vite port)
- Register/login via frontend, API endpoints are protected with JWT.

---

## Troubleshooting
- If CORS errors occur, ensure `django-cors-headers` is installed and configured in `backend/config/settings.py`.
- If you change ports, update `VITE_BACKEND_URL` accordingly.

---


## Production Considerations

This project is configured for development. Additional hardening would be required for a
production deployment.
- For production, set `DEBUG=False` and use a strong `SECRET_KEY`.
- Use proper static file serving and secure deployment practices.

---

## Project Structure
```
presentation/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── package.json
│   └── ...
```
