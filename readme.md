# Place

A replica of r/place for educational use.

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
