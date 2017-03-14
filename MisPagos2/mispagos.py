#all imports

#all the imports
import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort,\
render_template, flash

app = Flask(__name__)
app.config.from_object(__name__) #Load config from this file

# Load default config and override config from an environment variable
app.config.update(dict(
	DATABASE=os.path.join(app.root_path, 'mispagos.db'),
	SECRET_KEY='development key',
	USERNAME='admin',
	PASSWORD='default'
	))
app.config.from_envvar('MISPAGOS_SETTINGS', silent=True)


def connect_db():
		"""Connects to the specific database"""
		rv = sqlite3.connect(app.config['DATABASE'])
		rv.row_factory = sqlite3.Row
		return rv


def get_db():
	"""Opens a new database connection if there is none yet for the current app context.
	"""
	if not hasattr(g,'sqlite_db'):
		g.sqlite_db = connect_db()
		return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
	""" Closes the database again at the end of the request. """
	if hasattr(g, 'sqlite_db'):
		g.sqlite_db.close()


@app.route('/show')
def show_pagosmensuales():
	db = get_db()
	cur = db.execute('SELECT name_p, vencimiento, valor FROM pagosmensuales'
					 'INNER JOIN mispagos ON id_pago=id_p')
	pagos = cur.fetchall()
	return render_template('show_pagos.html',pagos=pagos)


@app.route('/new')
def new_pago():
	return render_template('new_pago.html')	


@app.route('/add', methods=['POST'])
def add_pago():
	if not session.get('logged_in'):
		abort(401)
	db = get_db()
	nombre=request.form['name_p']
	cur=db.execute('SELECT id_p FROM mispagos WHERE name_p=(?)',(nombre,))
	idp = cur.fetchone()
	db.execute('INSERT INTO pagosmensuales (id_mes, id_pago, vencimiento, valor) values (?,?,?,?)',
				[request.form['id_mes'], idp[0], request.form['vencimiento'],\
				request.form['valor']])
	db.commit()
	flash('New entry was succesfully posted')
	return redirect(url_for('show_pagosmensuales'))


@app.route('/login', methods=['GET','POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != app.config['USERNAME']:
			error = 'Invalid username'
		elif request.form['password'] != app.config['PASSWORD']:
			error = 'Invalid password'
		else:
			session['logged_in'] = True
			flash('You were logged in')
			return redirect(url_for('show_pagosmensuales'))
	return render_template('login.html', error=error)


@app.route('/logout')
def logout():
	session.pop('logged_in',None)
	flash('You were logged out')
	return redirect(url_for('login'))

