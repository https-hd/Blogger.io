//Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const userController = require('./controllers/userController');
const blogPostController = require('./controllers/blogPostController');
const commentController = require('./controllers/commentController');
const userModel = require('./models/user');
const blogPostModel = require('./models/blogPost');
const commentModel = require('./models/comment');

//Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3305,
  user: 'root',
  password: 'hooda786',
  database: 'blogger.io'
});

//Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL!');
});

//Create the Express app
const app = express();

//Set up Express to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up Express to serve static files from the directory called 'public'
app.use(express.static('blogger.io'));

//Create the user, blog post, and comment models
const userModelInstance = new userModel(db);
const blogPostModelInstance = new blogPostModel(db);
const commentModelInstance = new commentModel(db);

//Create the user, blog post, and comment controllers
const userControllerInstance = new userController(userModelInstance);
const blogPostControllerInstance = new blogPostController(blogPostModelInstance);
const commentControllerInstance = new commentController(commentModelInstance);

//Create the router
const router = express.Router();

//Set up the routes
router.get('/users', userControllerInstance.getUsers);
router.post('/users', userControllerInstance.createUser);
router.get('/users/:id', userControllerInstance.getUserById);
router.put('/users/:id', userControllerInstance.updateUser);
router.delete('/users/:id', userControllerInstance.deleteUser);

router.get('/blog-posts', blogPostControllerInstance.getBlogPosts);
router.post('/blog-posts', blogPostControllerInstance.createBlogPost);
router.get('/blog-posts/:id', blogPostControllerInstance.getBlogPostById);
router.put('/blog-posts/:id', blogPostControllerInstance.updateBlogPost);
router.delete('/blog-posts/:id', blogPostControllerInstance.deleteBlogPost);

router.get('/comments', commentControllerInstance.getComments);
router.post('/comments', commentControllerInstance.createComment);
router.get('/comments/:id', commentControllerInstance.getCommentById);
router.put('/comments/:id', commentControllerInstance.updateComment);
router.delete('/comments/:id', commentControllerInstance.deleteComment);

//Set up Express to use the router
app.use('/api', router);

//Start the app listening on port 8080
app.listen(8080, () => {
  console.log('Server started on port 8080!');
});
