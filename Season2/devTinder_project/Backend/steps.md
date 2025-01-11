- create a repository => \devTinder_project\Backend
- initialize the repository => npm in it
- node_modules, package.json, package-lock.json
- install Express JS => npm i express
- create a server
- listen to port 3000
- write request handlers for /test, /hello
- install nodemon and update scripts inside package.json => npm i nodemon, this monitors the session without rebooting the servers everytime
- what are dependencies
- what is the use of '-g' while npm install
- difference between caret & tilde (^ vs ~)

## S2E4 - Routing & Request Handlers

- initialize git =>
  git init
  git add .
  git commit -m "message"
- create remote repo on github
  git remote add origin https://github.com/<username>/devTinder.git
  git branch -M main
- push all code to remove origin
  git push -u origin main
- routes & route extensions, eg.- /hello, /, /hello/2, /xyz
- order of routes
- for API testing, use POSTMAN
- write logic to handle GET, POST, PUT, DELETE API calls and test them on Postman
- explore routing and use of ?, +, (), \* in the routes
- use of REGEX in routes /a/. /.\*fly$/
- reading the query params in the routes
- reading the dynamic routes

## S2E5 - Middleware & Error Handling

- multiple route handlers
- next()
- next function & errors along with res.send()
- app.use('/route', rH, [rH2, rH3], rH4, rH5)
- what is MIDDLEWARE? why middleware?
- how express JS handles requests behind the scenes?
- diff b/w app.use & app.all
- auth middleware for admin
- auth middleware for all user routes, except /user/login
- error handling => (err, req, res, next) => {}

## S2E6 - Database, Schema & Models | Mongoose

- Install mongoose library => npm i mongoose
- using mongoose to connect to DB
- connect your application to the database "<connection-url>/devTinder", if not DB named as devTinder, it will automatically create one
- call connectDB function and connect to DB before starting application on 7777
- create userSchema & user Model
- inserting data into Database, by creating API
- create POST /signup API to add data to database
- push some documents using API calls from postman
- creating new instance of the User model, saving data in Mongo DB database

## S2E7 - Working with APIs

- js object vs. JSON
- add express.json middleware to your app
- make signup API dynamic to receive data from end user
- API - feed API - get all users from database and give back to UI
- API - get user by email
- API - delete user by ID
- API - update user by ID and email

## S2E8 - Data Sanitization & Schema Validation

- explore schemaType options from the documentation
- add required, unique, lowercase, min, minLength, trim
- add default
- create a custom validate function for gender
- improve the DB schema - PUT all appropriate validations on each field in schema
- add timestamps to the userSchema
- add API level validation on Patch request & /signup POST API
- add API validation for each field
- install validator library => npm i validator
- explore validator library function and user it for password, email, photo

## S2E9 - Encrypting Password

- validate data in /signup API
- install bcrypt package => npm i bcrypt
- create encryptPassword using bcrypt.hash & save the user with encrypted password
- create /login API
- compare passwords and throw errors if email/password is invalid
