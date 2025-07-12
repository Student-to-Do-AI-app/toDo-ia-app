# masive.py
import requests

tasks = [
    {
        "title": "Set up development environment",
        "description": "Install dependencies and prepare the project",
        "completed": True,
        "time_spent": 40,
    },
    {
        "title": "Design database",
        "description": "Initial ER model",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Implement user login",
        "description": "Screen and backend",
        "completed": True,
        "time_spent": 60,
    },
    {
        "title": "Create landing page",
        "description": "HTML, CSS, and React",
        "completed": True,
        "time_spent": 30,
    },
    {
        "title": "Dashboard design",
        "description": "Mockups in Figma",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Optimize Webpack bundle",
        "description": "Reduce final size",
        "completed": True,
        "time_spent": 25,
    },
    {
        "title": "Implement Dark Mode",
        "description": "Light/Dark theme",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Create metrics endpoint",
        "description": "REST API",
        "completed": True,
        "time_spent": 20,
    },
    {
        "title": "Configure ESLint",
        "description": "Rules to keep code clean",
        "completed": True,
        "time_spent": 10,
    },
    {
        "title": "Set up CI with GitHub Actions",
        "description": "Automatic deploy",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Add form validation",
        "description": "Frontend and backend",
        "completed": True,
        "time_spent": 35,
    },
    {
        "title": "Create responsive footer",
        "description": "",
        "completed": True,
        "time_spent": 15,
    },
    {
        "title": "Connect frontend with API",
        "description": "Requests with fetch/axios",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Review pull requests",
        "description": "Team feedback",
        "completed": True,
        "time_spent": 25,
    },
    {
        "title": "Project documentation",
        "description": "Detailed README",
        "completed": True,
        "time_spent": 20,
    },
    {
        "title": "Add unit tests",
        "description": "Using Jest and Testing Library",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Optimize images",
        "description": "WebP and compression",
        "completed": True,
        "time_spent": 10,
    },
    {
        "title": "Create card component",
        "description": "Reusable in React",
        "completed": True,
        "time_spent": 18,
    },
    {
        "title": "Update npm dependencies",
        "description": "npm audit fix",
        "completed": True,
        "time_spent": 8,
    },
    {
        "title": "Prepare presentation for demo",
        "description": "Slides and script",
        "completed": False,
        "time_spent": 0,
    },
]

url = "http://localhost:8000/tasks"

for task in tasks:
    response = requests.post(url, json=task)
    print(f"Status: {response.status_code}, Response: {response.json()}")
