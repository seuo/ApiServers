var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var fileUpload = require('express-fileupload');

var Idea = require('./idea-model');
// var User = require('./user-model');
// var Type = require('./type-model');

//setup database connection
var connectionString = 'mongodb://adminSam:Qwert123@brainstormusers-shard-00-00-qol9b.gcp.mongodb.net:27017,brainstormusers-shard-00-01-qol9b.gcp.mongodb.net:27017,brainstormusers-shard-00-02-qol9b.gcp.mongodb.net:27017/ideas?ssl=true&replicaSet=brainstormUsers-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));


//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(fileUpload());

app.use(logger('dev'));


app.use(express.static('public'))

//setup routes
var router = express.Router();

router.get('/testing', (req, res) => {
  res.send('<h1>Testing is working</h1>')
})

router.get('/idea', (req, res) => {

	Idea.find()
	.then((idea) => {
	    return res.json(idea);
	});

})

router.get('/idea/:id', (req, res) => {

	Idea.findOne({id:req.params.id})
	.then((Idea) => {
	    return res.json(Idea);
	});
})

router.post('/idea', (req, res) => {

	var Idea = new Idea();
	Idea.id = Date.now();
	
	var data = req.body;
	console.log(data);
	Object.assign(Idea,data);
	
	Idea.save()
	.then((Idea) => {
	  	return res.json(Idea);
	});
});

router.delete('/idea/:id', (req, res) => {

	Idea.deleteOne({ id: req.params.id })
	.then(() => {
		return res.json('deleted');
	});
});

router.put('/idea/:id', (req, res) => {

	Idea.findOne({id:req.params.id})
	.then((Idea) => {
		var data = req.body;
		Object.assign(Idea,data);
		return Idea.save()	
	})
	.then((Idea) => {
		return res.json(Idea);
	});	

});

// router.get('/users', (req, res) => {

// 	User.find()
// 	.then((users) => {
// 	    return res.json(users);
// 	});

// })

// router.get('/users/:id', (req, res) => {


// 	User.findOne({id:req.params.id})
// 	.then((user) => {
// 	    return res.json(user);
// 	});
// })


// router.post('/users', (req, res) => {

// 	var user = new User();
// 	user.id = Date.now();
	
// 	var data = req.body;
// 	Object.assign(user,data);
	
// 	user.save()
// 	.then((user) => {
// 	  	return res.json(user);
// 	});
// });

// router.delete('/users/:id', (req, res) => {

// 	User.deleteOne({ id: req.params.id })
// 	.then(() => {
// 		return res.json('deleted');
// 	});
// });

// router.put('/users/:id', (req, res) => {

// 	User.findOne({id:req.params.id})
// 	.then((user) => {
// 		var data = req.body;
// 		Object.assign(user,data);
// 		return user.save()	
// 	})
// 	.then((user) => {
// 		return res.json(user);
// 	});	

// });

// router.get('/types', (req, res) => {

// 	Type.find()
// 	.then((types) => {

// 	    return res.json(types);
// 	});

// })

// router.get('/types/:id', (req, res) => {

// 	Type.findOne({id:req.params.id})
// 	.populate('idea')
// 	.then((type) => {

// 	    return res.json(type);
// 	});

// })

// router.post('/upload', (req, res) => {

// 	var files = Object.values(req.files);
// 	var uploadedFile = files[0];

// 	var newName = Date.now() + uploadedFile.name;

// 	uploadedFile.mv('public/'+ newName, function(){
// 		res.send(newName)
// 	})
	
// });

// router.post('/authenticate', (req, res) => {

	
// 	var {username,password} = req.body;
// 	var credential = {username,password}
// 	User.findOne(credential)
// 	.then((user) => {
// 	    return res.json(user);
// 	});
// });



app.use('/api', router);

// launch our backend into a port
const apiPort = 3001;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));

