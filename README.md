# 212-arcade

## virtual environment -- mac
python3 -m venv env
source env/bin/activate
pip install flask

## virtual environment -- windows
py -m venv env
env\scripts\activate.bat
pip install flask

## running flask -- mac
export FLASK_APP=run.py
export FLASK_DEBUG=1
flask run

## running flask -- windows  
env\scripts\activate.bat
set FLASK_APP=run.py
set FLASK_DEBUG=1
py -m flask run


#command option C, Ctrl shift C, F12 -- developer tools
