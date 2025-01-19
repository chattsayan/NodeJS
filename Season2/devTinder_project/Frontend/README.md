# DevTinder Application UI part

## Part 1 - Project Setup

- create vite + react application
  npm create vite@latest Frontend -- --template react
- install Tailwind CSS
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
- install daisyUI
  npm i -D daisyui@latest
- install react-router-dom for routing - routing to be done on root level of application, here it is on app.js
  npm i react-router-dom
- create BrowserRouter > Routes > Route=/body > RouteChildren
- create an <Outlet /> in Body.jsx which holds all RouteChildren

## Part 2

- install axios => npm i axios
- install CORS in backend => npm i cors > add middleware with configuration: origin & credentials: true in app.js
- whenever making an API call, pass axios => {withCredentials: true}
- install redux-toolkit => npm i @reduxjs/toolkit react-redux - https://react-redux.js.org/tutorials/quick-start
- steps involved in store: configureStore > Provider > createSlice > add reducer to store > dispatch (useDispatch) > subscribed to store (useSelector)
- hooks: useState, useNavigate

## Part 3

- other Routes are made inaccessible without login
- if token not present, redirect user to login page
- Logout feature
- get feed and add feed in the store
- UserCard built on feed
- profile/edit created
