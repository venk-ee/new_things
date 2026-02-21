"""WSGI entry point for production servers (gunicorn, waitress, etc.)

Usage:
    gunicorn wsgi:app
    waitress-serve wsgi:app
"""
from app import app  # noqa: F401

if __name__ == "__main__":
    app.run()
