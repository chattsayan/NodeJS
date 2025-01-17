# DevTinder Application UI part

## Project Setup

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
