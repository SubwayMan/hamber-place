# Place

A replica of r/place for educational use.

### Setup

Ensure you have `pipenv` installed.
Clone the repository, then run `pipenv shell` inside the root folder.
When pipenv has finished setup, run `pipenv install django`.

### Starting the server

Ensure that `pipenv shell` has been run, then run:
```
python3 manage.py runserver
```

To allow other computers to access the site over LAN, run:
```
python3 manage.py runserver 0.0.0.0:8000
```
Navigate to `127.0.0.1:8000/home/` to see the canvas.

