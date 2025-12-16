# Social Media App

A modern social media platform built with React, Vite, and Django, designed for seamless content sharing and user interaction. Dockerized for simple setup and deployment.

---

## Features

* User registration, login, and authentication
* Create and delete posts
* Comment and like posts
* Follow and unfollow other users
* Edit profile
* Search for users by name, surname or username
* Responsive UI for mobile and desktop
* Easily deployable with Docker

---

## Prerequisites

* Docker >= 20.x
* Docker Compose >= 2.x
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/ikamania/social-media.git
cd social-media
```

## 2. Build and run the Docker containers

```bash
docker-compose up --build
```

* The website will be available at `http://localhost:5173/`.

---

## 3. Apply migrations

```bash
docker-compose exec backend uv run api/manage.py migrate
```

* Sets up the database tables.

---


## Stop the containers

```bash
docker-compose down
```

---

## Tips

* To reset the database:

```bash
docker-compose exec backend rm api/db.sqlite3
docker-compose exec backend uv run api/manage.py migrate
