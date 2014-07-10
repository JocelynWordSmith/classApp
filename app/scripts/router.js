'use strict';

var loginView;
var uploadView;
var postView;

var AppRouter = Parse.Router.extend({

	routes: {
		'': 'home',
		'app': 'app',
	},

	initialize: function() {


	},

	home: function() {

		if (uploadView) {
			uploadView.remove();
		}
		if (postView) {
			postView.remove();
		}
		loginView = new LoginView();
	},

	app: function() {

		if (loginView) {
			loginView.remove();
		}

		uploadView = new UploadView();

		var posts = new PostCollection();

		posts.fetch({
			success: function(collection) {
				collection.each(function(object) {
					console.warn(object);
					// object.attributes.imageFile.url();
					postView = new PostView({
						model: object
					});
				});
			},
			error: function(collection, error) {
				console.log('could not retrieve object');
			}
		});
	},
});