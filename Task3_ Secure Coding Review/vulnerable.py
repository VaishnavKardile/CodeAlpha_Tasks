import sqlite3
import os

DB_NAME = "users.db"

# Database connection (no error handling)
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Create users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    role TEXT
)
""")

# Hardcoded admin account (INSECURE)
cursor.execute("""
INSERT INTO users (username, password, role)
VALUES ('admin', 'admin123', 'administrator')
""")
conn.commit()


def register_user():
    username = input("Enter username: ")
    password = input("Enter password: ")
    role = input("Enter role: ")

    # SQL Injection vulnerability
    query = f"""
    INSERT INTO users (username, password, role)
    VALUES ('{username}', '{password}', '{role}')
    """
    cursor.execute(query)
    conn.commit()

    print("User registered successfully!")


def login_user():
    username = input("Username: ")
    password = input("Password: ")

    # SQL Injection vulnerability
    query = f"""
    SELECT * FROM users
    WHERE username='{username}' AND password='{password}'
    """
    cursor.execute(query)

    user = cursor.fetchone()
    if user:
        print(f"Welcome {user[1]} | Role: {user[3]}")
    else:
        print("Invalid credentials")


def view_all_users():
    # No authentication or authorization
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()

    print("\n--- Registered Users ---")
    for user in users:
        print(user)


def delete_user():
    user_id = input("Enter user ID to delete: ")

    # SQL Injection vulnerability
    query = f"DELETE FROM users WHERE id={user_id}"
    cursor.execute(query)
    conn.commit()

    print("User deleted successfully!")


def main_menu():
    while True:
        print("\n===== MENU =====")
        print("1. Register User")
        print("2. Login")
        print("3. View All Users")
        print("4. Delete User")
        print("5. Exit")

        choice = input("Select option: ")

        if choice == "1":
            register_user()
        elif choice == "2":
            login_user()
        elif choice == "3":
            view_all_users()
        elif choice == "4":
            delete_user()
        elif choice == "5":
            break
        else:
            print("Invalid option")


main_menu()
