//initialize parse location
Parse.initialize("dt8DfJoVpPqTM004VdtOUEeXXqRdxBfc88fksbNN", "gsPQIKflI4ErhhNa4Ad6HNzcyhEjoYjumZLJRKcE");

//instance of Post Collection
var posts = new PostCollection();

posts.fetch({
  success: function(collection) {
    collection.each(function(object) {
    	console.warn(object);
      // object.attributes.imageFile.url();
    	new PostView({
    		model: object
    	});
    });
  },
  error: function(collection, error) {
    console.log('could not retrieve object');
  }
});






// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });

// var first = new Post()

// var query = new Parse.Query(Post)


// $('.upload-file').click(function(){
// 	var fileUploadControl = $('.input-file')[0];
// 	if (fileUploadControl.files.length > 0) {
// 	  var file = fileUploadControl.files[0];
// 	  var title = 'photo.jpg';
// 	  var parseFile = new Parse.File(title, file);
// 	}
// 	parseFile.save().done(function(){
// 		console.log('it worked!')
// 	}).fail(function(){
// 		console.log('oops... it failed.')
// 	});


// 	var image = new Parse.Object("Post");
// 	image.set("caption", "enlightenment");
// 	image.set("imageFile", parseFile);
// 	image.save();


// // var postPhoto = image.get("imageFile");
// // $(".image-display")[0].src = postPhoto.url();
// })
