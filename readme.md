# Place

A replica of r/place for educational use.

### Backstory

This project was whipped up in the latter half of April 2022 for Eric Hamber Secondary's programming club. The idea of the activity was to create bots that drew on the canvas - this was done through copying cURL requests in the browser and converting them to Python calls.

### Disclaimer

This project is at an Alpha level of readiness. The code is not sufficiently organized and the setup instructions provided in this README may be outdated.
This code is currently only published for ease of access by its authors.

### Setup

Note that windows users should use WSL.
Ensure you have `pipenv`, `redis` installed.
Clone the repository, then run `pipenv shell` inside the root folder.
When pipenv has finished setup, run `pipenv install`.

### Starting the server

Ensure that `pipenv shell` has been run, then run:
```
python3 setup.py
python3 manage.py migrate
python3 manage.py runserver
```
`setup.py` only needs to be run once upon cloning, while `migrate` should be run after every pull and 
database structure update.

To allow other computers to access the site over LAN, run:
```
python3 manage.py runserver 0.0.0.0:8000
```
Navigate to `127.0.0.1:8000/` to see the canvas.

### Create an admin user
Run the following:
```bash
python3 manage.py createsuperuser
```
Navigate to `127.0.0.1:8000/admin` to log in.
