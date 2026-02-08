# Secure Coding Review Report – Python User Management Application

## Introduction
This report presents a secure coding review of a Python-based user management
application developed for learning purposes. The objective of this review is to
identify security vulnerabilities and recommend best practices to enhance the
security of the application.

---

## Application Overview
- Language: Python
- Database: SQLite
- Functionality:
  - User registration
  - User login
  - View all users
  - Delete users
- Review Method: Manual code inspection

---

## Identified Security Vulnerabilities

### 1. Hardcoded Credentials
**Description:**  
The application inserts a default administrator account with a hardcoded
username and password.

**Impact:**  
Anyone with access to the source code can gain administrator access.

**Recommendation:**  
Remove hardcoded credentials and use secure account provisioning mechanisms.

---

### 2. Plaintext Password Storage
**Description:**  
Passwords are stored directly in plaintext within the database.

**Impact:**  
If the database is compromised, all user credentials are exposed.

**Recommendation:**  
Use strong password hashing algorithms such as bcrypt or PBKDF2.

---

### 3. SQL Injection Vulnerabilities
**Description:**  
User input is directly concatenated into SQL queries during login, registration,
and deletion operations.

**Impact:**  
Attackers can manipulate queries to bypass authentication or delete data.

**Recommendation:**  
Use parameterized queries or prepared statements.

---

### 4. Lack of Input Validation
**Description:**  
The application does not validate usernames, passwords, roles, or IDs.

**Impact:**  
Allows malicious input and data integrity issues.

**Recommendation:**  
Implement strict input validation and sanitization.

---

### 5. Missing Authentication and Authorization
**Description:**  
Sensitive actions such as viewing and deleting users can be performed without
authentication.

**Impact:**  
Unauthorized users can access or manipulate sensitive data.

**Recommendation:**  
Implement role-based access control (RBAC).

---

### 6. No Error Handling
**Description:**  
Database operations are not wrapped in exception handling blocks.

**Impact:**  
Application crashes may reveal internal details.

**Recommendation:**  
Use proper try–except blocks and secure logging mechanisms.

---

### 7. Insecure Database Access
**Description:**  
Database file permissions are not restricted.

**Impact:**  
Local attackers may access or modify the database.

**Recommendation:**  
Restrict file permissions and secure database storage.

---

### 8. Lack of Session Management
**Description:**  
The application does not maintain authenticated user sessions.

**Impact:**  
Users can perform actions without being logged in.

**Recommendation:**  
Implement session handling or token-based authentication.

---

## Secure Coding Best Practices
- Avoid hardcoded credentials
- Hash and salt passwords
- Use parameterized database queries
- Validate all user inputs
- Enforce authentication and authorization
- Implement proper error handling
- Follow the principle of least privilege

---

## Conclusion
The reviewed application contains multiple critical security vulnerabilities that
could be exploited by attackers. Applying secure coding practices and defensive
programming techniques can significantly improve the security and reliability
of the application.
