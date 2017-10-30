var Item = Backbone.Model.extend({});

var Image = Backbone.Model.extend({});
 
var Items = Backbone.Collection.extend({
    model: Item,
    url: "https://www.jasonbase.com/things/2MDJ/  ",
	parse: function(response) {
		return response.items;
	}
}); 
 
var Images = Backbone.Collection.extend({
	model: Image
});
 
var ItemsView = Backbone.View.extend({
	el: $("#container"),
	initialize: function () {
		_.bindAll(this, "render");
		this.collection.bind('reset', this.render);
	},
	render: function(){
		this.$el.html('');

		this.collection.each(function(model) {
			var newItem = new itemView({
			model: model
		});

		this.$el.append(newItem.render().el);
		}.bind(this));
		
		return this;
	},
}) 
 
var itemView = Backbone.View.extend({
	className : 'itemView',
	template : _.template($("#items_template").html()),
	initialize : function(){
		_.bindAll(this, 'render');
	},
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		var imagesView = new ImagesView({collection: new Images(this.model.get("images"))})
		this.$el.append(imagesView.render().el);
		this.$el.append("<div class='clearfix'></div>");
		return this;
	}
});
 
var ImagesView = Backbone.View.extend({
	initialize : function(){
		_.bindAll(this, 'render');
	},
	render : function(){
		var index = 0;
		var that = this;
		this.collection.each(function(model) {
			model.set({index: index , parent : this});
			var imageView = new ImageView({
				model: model
			});
			this.$el.append(imageView.render().el);
			index++;
		}.bind(this));
		return this;
	},
	imageSelectedEvent : function(data){
		if(data.index < 0 || data.index > this.collection.length - 1) {
			return;
		}
		var model = this.collection.at(data.index)
		if(!this.imagePopupView) {
			this.imagePopupView = new ImagePopupView({model : model.clone()});
		}
		else {
			this.imagePopupView.remove();
			model = model.set({url : model.get('url'), index:data.index});
			this.imagePopupView = new ImagePopupView({model : model});
		}
		this.$el.append(this.imagePopupView.render().el);
	}
})
 
var ImageView = Backbone.View.extend({
	className : 'responsive',
	template : _.template($("#image_template").html()),
	initialize : function(){
		_.bindAll(this, 'render');
	},
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	},
	events: {
		'click .button': function() {
			var parent = this.model.get("parent");
			parent.imageSelectedEvent({index : this.model.get("index")});
		}
	},
});
 
var ImagePopupView = Backbone.View.extend({
	template : _.template($("#popup_image_template").html()),
	initialize : function(){
		_.bindAll(this, 'render');
	},
	render : function(){
		this.$el.append(this.template(this.model.toJSON()));
		return this;
	},
	events: {
		'click #left_nav': function(event) {
			event.stopImmediatePropagation();
			var parent = this.model.get("parent");
			parent.imageSelectedEvent({index : this.model.get("index") - 1});
		},
		'click #right_nav': function(event) {
			event.stopImmediatePropagation();
			var parent = this.model.get("parent");
			parent.imageSelectedEvent({index : this.model.get("index") + 1});
		},
		'click .popup_view': function() {
			$('.popup_view').remove();
		},
		'click #close_popup_view': function() {
			$('.popup_view').remove();
		},
	},
               
});
 
var items = new Items();
var itemsView = new ItemsView({ collection: items });
items.fetch({reset : true});