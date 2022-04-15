const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Load the full build.
const _ = require('lodash');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.


const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae nibh mattis, cursus erat varius, rutrum justo. Donec aliquam lectus nec porttitor rutrum. Donec a purus suscipit velit interdum tempus at auctor odio. Sed dignissim dignissim lobortis. Vestibulum non lacinia nisi. Maecenas tincidunt sem ac quam consequat, id tincidunt quam dignissim.";


const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render("home", {homeStartingContent : homeStartingContent, posts: posts});
})

app.get('/about', function(req, res) {
  res.render("about", {aboutContent : aboutContent});
})

app.get('/contact', function(req, res) {
  res.render("contact", {contactContent : contactContent});
})

app.get('/compose', function(req, res) {
  res.render("compose");
})

app.post('/compose', function(req, res){
  const post = {
    title: req.body.title,
    post: req.body.post,
  };
  posts.push(post);
  res.redirect('/');
})

app.get('/posts/:postTitle', function(req, res){
  let postTitle = _.kebabCase(req.params.postTitle);
  console.log(postTitle);
  for(var i = 0; i < posts.length; i++) {
      if (_.kebabCase(posts[i].title) == postTitle) {
          res.render('post', {post : posts[i]});
          break;
      } else {
        console.log('Not a match !');
      }
  }
})

app.listen(3000, function(){
  console.log("Server running on port 3000.");
})
