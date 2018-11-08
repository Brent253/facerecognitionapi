	const Clarifai = require('clarifai');

	//Add your own API key from Clarifai.
	const app = new Clarifai.App({
	  apiKey: '491a261be5684d2282d1bd8dd1514cfe'
	});
		
		const handleApiCall = (req, res) => {
		app.models
	  	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
	}


		const handleImage = (req, res, db) => {


		const { id } = req.body;
		db('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
	}

	module.exports = {
		handleImage,
		handleApiCall

	}