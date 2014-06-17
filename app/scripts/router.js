'use strict';

var loginView;

var AppRouter = Backbone.Router.extend({

	routes: {
		'': 'home',
		'app': 'app',
	},

	initialize: function() {


	},

	home: function() {

		loginView = new LoginView();
	},

	app: function() {

		if (loginView){
			loginView.remove();
		};

		new UploadView();

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
	},
});