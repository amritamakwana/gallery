# gallery

Responsive Gallery Page that renders data from following response feed (http://origin-www.tasteofhome.com/feed/msn-slideshows/) using Backbone

For each item in the response, it displayes Main Title, Abscract Text, Auther, and a Card containing gallery of images.

On each image there is a button on the bottom right corner, and on click of it corresponding image opens in a popup along with title and description. For multiple images there will be left and right navigation option.

Page is served from a simple http server using node js (http-server)

Steps:
* npm install http-server -g
* http-server

Server location: http://127.0.0.1:8080/

## Technical Description
#### Libraries used: 
* Underscore
* JQuery
* Backbone

#### Page consists of following collections, models, and views
###### Collections
* Items - Collection corresponding to list of items. Items Collection fetches the data from JSON response, and renders it in ItemsView
* Images - Collection corresponding to list of images in each item

###### Models
* Item - Model corresponding to each item
* Image - Model corresponding to each image

###### Views
* ItemsView - View to display list of items
* ItemView - View that shows list of images availabe in each item along with title, abscract text and author
* ImagesView - View that shows list of images availabe in each item
* ImageView - View that shows each image along with a button on bottom right coner
* ImagePopView - View that shows that image in a popup along with title, description and navigation options








