//parse model for image posts
var Post = Parse.Object.extend({
	className: 'Post'
});

//parse collection containing all posts (images)
var PostCollection = Parse.Collection.extend({
  model: Post
});

