# Project-3 Best London Parks

![](/assets/images/demo.png)

Check our deployed version [here](http://bestlondonparks.herokuapp.com/)

Overview
Third project for GA bootcamp as part of a team, Full-Stack MERN Application with CRUD functionality. As a group, we created an app with the objective to integrate information about the best London parks. We all worked full-stack whereas my responsibilities were: to build and fill in the database, to create comments functionality, build the weather forecast component using public OpenWeather API, as well as create and style the park page.

## Team

- [Piotr Jankowski](https://github.com/janek2204)
- [Matthew Baxendale](https://github.com/mbaxendale22)
- [Mariana Lozynska](https://github.com/mlozynska)

## Timeframe

9 days

## Installation

- Clone repo or download zip
- Run `yarn install` in root folder to install dependencies
- Start the database in your terminal `mongod --dbpath ~/data/db`
- Start the backend server using `yarn serve`
- Change into frontend folder `cd front-end`
- Run the frontend `yarn start`

## Brief

As a group, create a Fullstack application with CRUD functionality using MERN stack – MongoDB, Express, React & Node.

## Technologies used

- ### Backend:
  Node.js, MongoDB, Express, BCrypt, Mongoose, JWT (jsonwebtoken)
- ### Frontend:
  React.js, Axios, Semantic UI React, React Router Dom, React Mapbox GL, React Responsive Carousel, React Toastify, cloudinary.com (image host service), OpenWeather API, TFL search travel tool
- ### Development tools:
  VS Code, yarn, Insomnia, Heroku, Figma, Git/GitHub

## Approach

We spent the first day deciding on an idea as well as planning our project with building wireframes. It definitely has helped us to be organised knowing exactly what features we are building and when. Here are our initial wireframes for the project.

![](/assets/images/wireFrames.png)

At the beginning of our project, we agreed as a group that we would meet twice a day. Every morning, we did a stand-up meeting to discuss our plan for the day. Another meeting was held in the afternoon to discuss progress or any issues we were having. If some difficulties arose during the day between the meetings the team would either pair code to find solutions or meet together to discuss. For communication we used Slack and Zoom.

It was the first-time team cooperation when we had to start working on our own individual branches in GitHub. We made the decision to do pushes and pulls all together to avoid potential merging conflicts.

Next three days, we dedicated ourselves to the backend. As all of us wanted to work both on backend and frontend, we agreed that it would be a good idea to split the process of building the models’ schemas, routes and controllers between us. Matthew took on models, Piotr started to build routes for all three models and my responsibility was to build and fill in the database. At the end of day 4, we sorted out routes, models and seeded databases.
We connected the backend with the frontend and tested all routes with the help of HTTP-proxy-middleware. This lets us work on both parts to easily apply any changes without going through the build process each time.

After that we were ready to start with frontend. We divided our tasks and responsibilities. Matthew started to work on filtering parks, adding ratings and travel information to certain parks, on the possibility to mark a park as favourite. Piotr took over design of HomePage and AllParks components, user registration and login, uploading images with cloudinary.com, user profile page and MapBox. I took over ParkPage design, comments functionality, OpenWeather API with the next 3-day forecasts.

Our application has three main pages which are Home, All Parks and Park Page. On Home page users can choose a region by which to filter parks – North, Central, South, East, West London or to see All Parks.

![](/assets/images/homeANDRegion.png)

Our Park Page contains a picture carousel, detailed information about the park - weather forecast, suggested activities, a map showing the park’s location, an option to get real-time travel information, to leave a comment and rating to the park, as well as adding park to the list of favourite parks.

![](/assets/images/parkPage.png)

### Backend

We decided to spend a few days building the backend all together before we moved to the front-end and split out to build feature by feature. My responsibility was to build a database and fill in all necessary information - images, description, possible activities, location, links.
As a team we decided that our park model will look like this:

To fill in the database it took me almost two days. We decided to filter parks by region, and for each region we wanted to display at least five parks. Our app has information about 25 parks. On ParkPage we wanted to display an image carousel, for that for each park we needed 5-7 nice quality images. I did not expect that it would take me so long to find all the necessary information.

### Front-End

When we sucesfully connected Backend with Frontend I started to work on creating and styling ParkPage, comments section and weather forecast for three days using Open Weather API.

With comments I started with displaying on the page existing comments.

To add the comment I used handleChange function and handleSubmit function.

To create a weather block I created a new Component and made a get request to display the forecast for three days.

For styling we used Semantic UI CSS framework, it took me some time to find out how to display all infpormation about the park in a nice and informative way. The most challenging with styling was to create responsive design.

## Challenges

- We were planning to use the external TFL United API to get real time travelling information for each park. Due to the size and complexity of this API, we didn’t have enough time to create a search engine for our site. Instead, we decided to use an already existing TFL search engine.
- The main challenge specific to my role in the team was to create comments functionality on the front-end, but with the help and support of my teammates I managed to add new comments.

## Wins

- We managed to create a nice application with a lot of functionality for such a short period of time.
- Good team work, efficient communication. We, as a team, had a lot of fun working together. It was the first time working in a team of three people on one project and single code base, we had to start working on our own individual branches in GitHub. At the start of the project we decided that we would do pushes and pulls all together to avoid potential merging conflicts. We were discussing and working through problems together, if needed we used pair-coding.

## Bugs

- After deployment, MapBox is not working.
- When the page is refreshed, it loses connection with API.

## Key learnings

- Semantic UI Framework. First time using another CSS framework that wasn’t Bulma. At the beginning it was a bit scary, but it was an amazing opportunity to learn and get more comfortable with another framework and to continue using it in future projects.
- MongoDB and working with NoSQL databases for the first time. It was great to get work building a first database.
- Importance of communication and collaboration when you are working in a team.
