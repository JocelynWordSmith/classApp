'use strict';

var LoginView = Parse.View.extend({

	events: {
		'click .submit-signup'	: 'signup',
		'click .submit-login'	: 'login',	
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
				window.location = "/#app";
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
			window.location = "/#app";
			console.log(user + 'logged in')
		},
		error: function(user, error) {
			// The login failed. Check error to see why.
		}
		});
	},

});

var UploadView = Parse.View.extend({

	template: _.template($('.upload-view').text()),

	initialize: function() {
		$('.input-container').html(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template;
		this.$el.html(renderedTemplate);
	},

});

var PostView = Parse.View.extend({

	className: 'post-bound',

	template: _.template($('.post-view').text()),


	initialize: function() {
		$('.active-container').prepend(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

});