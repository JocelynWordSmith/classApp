'use strict';

//initialize parse location
Parse.initialize('dt8DfJoVpPqTM004VdtOUEeXXqRdxBfc88fksbNN', 'gsPQIKflI4ErhhNa4Ad6HNzcyhEjoYjumZLJRKcE');

var router = new AppRouter();
Backbone.history.start();



// var TestObject = Parse.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({foo: 'bar'}).then(function(object) {
//   alert('yay! it worked');
// });



$('.upload-file').click(function() {

	var uploadedFile = $('.input-file')[0];

	if (uploadedFile.files.length > 0) {
		var file = uploadedFile.files[0];
		var title = 'photo.jpg';
		var parseFile = new Parse.File(title, file);

		parseFile.save().done(function() {
			console.log('it worked!');
		}).fail(function() {
			console.log('oops... it failed.');
		});

		var image = new Parse.Object('Post');
		image.set('caption', 'enlightenment');
		image.set('imageFile', parseFile);
		image.save().done(function() {
			new PostView({
				model: image
			});
		});
	}



});