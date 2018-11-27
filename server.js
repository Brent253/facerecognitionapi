	const express = require('express');
	const bodyParser = require ('body-parser'); //never forget
	const bcrypt = require('bcrypt-nodejs');
	const cors = require('cors');

	const register = require('./controllers/register');
	const signin = require('./controllers/signin');
	const profile = require('./controllers/profile');
	const image = require('./controllers/image');
	//DB Connection begins here with knex.js and postgres (pg)
	const db = require('knex')({
		client: 'pg',
		connection: {
			host : '127.0.0.1',
			user : 'taylbre',
			password : '',
			database : 'smartbrain'
		}
	});

	const app = express();

	app.use(cors())
	app.use(bodyParser.json());
	

	app.get('/', (req, res)=>{ res.send(database.users) })
	app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt) })	
									//dependency injection
	app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })
	app.get('/profile/:id', (req,res)=> { profile.handleProfileGet(req, res, db) })
	app.put('/image', (req,res)=>{ image.handleImage(req, res, db) })
	app.post('/imageurl', (req,res)=>{ image.handleApiCall(req, res) })


	app.listen(3001, () =>{
		console.log('app is running on port 3001');
	})

	/*
	/-->res = this is working
	/signin --> POST = sucess/fail
	/register --> POST = user
	/profile/:userID --> GET = user
	/image --> PUT --> user
	*/
