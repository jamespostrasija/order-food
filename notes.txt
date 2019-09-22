====================================================
#YelpCamp --- Yelp / Sign-in/Login/Search Functions
====================================================

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

===================================================
Each Campground has
* Name
* Image
===================================================

===================================================

#Layout and Basic Styling
* Create header and footer partials
* Add in Bootstrap

===================================================

#Create New Campgrounds
* Setup new campground POST route
* Add in body-parser ---command line --npm install body-parser --s
* Setup route to show form
* Add basic unstyled form

===================================================

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display a grid

===================================================

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

===================================================

#Add Mongoose
* Install and configure
* Setup campground model
* Use campground mode inside of our routes

===================================================

#Show Page
* Review the RESTful routes we've see so far
* Add description to out campground model
* show db.collection.drop()
* Add a show route/templates

====================================================

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

====================================================

#add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

====================================================

#Add the Comment Model!
* Make our errors go away!
* Display comments on campground show page

====================================================

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

====================================================

#Style Show Page
* Add sidebar to show page
* Display Comments nicely

====================================================

##Style Show Page
* Add sidebar to show page
* Display comments nicely

====================================================

##Finish Styling Show Page

* Add public directory
* Add custom stylesheet

====================================================

##Auth Pt. 1 - Add User Model

* Install all packages needed for auth
* Define User model

====================================================

##Auth Pt. 2 - Register

* Configure Passport
* Add register routes
* Add register template

====================================================

##Auth Pt. 3 - Login

* Add login routes
* Add login template

====================================================

##Auth Pt. 4 - Logout/Navbar

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

=====================================================

##Auth Pt. 5 - Show/Hide Links

Show/hide auth links in navbar correctly

=====================================================

##Refactor The Routes

* Use Express router to reorganize all routes

=====================================================

=====================================================

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

=====================================================

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

=====================================================
#Editing Campgrounds

* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

npm install method-override

=====================================================

#Deleting Camgrounds
* Add Destroy Route
* Add Delete Button

=====================================================

# Authorization Part 1: Camgrounds
* User can only edit his/her camppgrounds
* User can only delete his/her campgrounds
* Hide/Show edit delete buttons

=====================================================

#Edting Comments
* Add Edit Route for comments
* Add Edit Button
* Add Update Route

//---/campgrounds/:id/edit
//---/campground/:id/comments_id/edit


====================================================

#Deleting Comments
* Add Destroy Route
* Add Delete Button

====================================================

#Authorization Part #2 Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware

=====================================================

#Adding in Flash/Messing
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

=====================================================

GOOGLE MAPS INSTALL

=====================================================

#Install Momemt JS

* Install moment js
* Require moment and add it to app.locals
* Update campground and comment models
* Use moment in your show.ejs file

=====================================================

#Install Admin Role

=====================================================

*Create Admin Role Routes.
*Create Admin Model
*NPM Install Admin (locus)
*SECRET KEY for password Admins routes/index.js

*MUST PASS IN A COMMAND LINE FOR 
Add key to application as ENV variable
Copy the key from the previous step and export it as an ENV variable from your terminal

 export GEOCODER_API_KEY=??API KEY
 
=====================================================
 
 #Creating User Profiles with Noje JS YelpCamp

=====================================================

#Adding in Like Feature in YelpCamp

=====================================================

*Add Like Feature on Main Page
*Add Show More of Likes

====================================================

#Password Reset 

=====================================================

* install packages needed for nodemailer 
* install packages needed for cryto
* Password reset page
* Password token page
* Password link send email 

=====================================================
RESTFUL ROUTES

name        url        verb      desc.
==============================================================
INDEX     /dogs 	   GET		 Display a list of all dogs
NEW       /dogs/new    GET       Display form to make a new dog
CREATE    /dogs        POST      Add new dog to DB
SHOW      /dogs/:id    GET       Shows info about one dog

##FOR THIS APPLICATION YELPCAMP
==============================================================
INDEX		/campgrounds
NEW			/campgrounds/new
CREATE		/campgrounds
SHOW		/campgrounds/:id

NEW 		campgrounds/:id/comments/new  GET
CREATE		campgrounds/:id/comments      POST

