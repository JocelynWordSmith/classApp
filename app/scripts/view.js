var PostView = Parse.View.extend({
	className: 'post-bound',

	template: _.template($('.post-view').text()),

	initialize: function() {

		$('.post-container').append(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

})