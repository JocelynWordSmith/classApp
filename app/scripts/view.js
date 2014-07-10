'use strict';

var LoginView = Parse.View.extend({

	events: {
		'click .submit-signup': 'signup',
		'click .submit-login': 'login',
	},

	template: _.template($('.login-view').text()),

	initialize: function() {
		$('.input-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template;
		this.$el.html(renderedTemplate);
	},

	signup: function() {
		var userName = $('.user-signup').val();
		var password = $('.password-signup').val();
		var email = $('.email-signup').val();

		var user = new Parse.User();
		user.set('username', userName);
		user.set('password', password);
		user.set('email', email);

		user.signUp(null, {
			success: function(user) {
				window.location = '/#app';
			},
			error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert('Error: ' + error.code + ' ' + error.message);
			}
		});
	},

	login: function() {
		var userName = $('.user-login').val();
		var password = $('.password-login').val();

		Parse.User.logIn(userName, password, {
			success: function(user) {
				// Do stuff after successful login.
				window.location = '/#app';
				console.log(user + 'logged in');
			},
			error: function(user, error) {
				// The login failed. Check error to see why.
			}
		});
	},

});

var UploadView = Parse.View.extend({

	events: {
		'click .upload-file': 'upload',
		'click .logout': 'logout',
	},

	template: _.template($('.upload-view').text()),

	initialize: function() {
		$('.input-container').html(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template;
		this.$el.html(renderedTemplate);
	},

	upload: function() {
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
			image.set('caption', $('.caption').val());
			image.set('user', Parse.User.current().attributes.username);
			image.set('imageFile', parseFile);
			
			// image.setACL(new Parse.ACL(Parse.User.current()));

			var postACL = new Parse.ACL(Parse.User.current());
			postACL.setPublicReadAccess(true);
			postACL.setPublicWriteAccess(false);
			image.setACL(postACL);

			image.save().done(function() {
				new PostView({
					model: image
				});
			});
		}
	},

	logout: function() {
		Parse.User.logOut();
		window.location = '/';

	},


});


var PostView = Parse.View.extend({

	className: 'post-bound',

	events: {
		'click .delete'			: 	'delete',
		'click .set-private'	: 	'makePrivate',
	},

	template: _.template($('.post-view').text()),


	initialize: function() {
		$('.active-container').prepend(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	delete: function() {
			this.model.destroy();
			this.remove();
	},

	makePrivate: function() {
		this.model.setACL(new Parse.ACL(Parse.User.current()));
		this.model.save();
	}

});