# Anyaa-Admin-Portal Frontend React Application

### Technologies used in this project

1. React.js
1. Redux.js
1. TypeScript
1. Ant Design
1. Styled-Components
1. Apollo Client
1. GraphQL





### Environment Variables to Run Application Locally

create a .env file in the root project directory and add these environment variables to run the project successfully

```
REACT_APP_API_URL="https://api.dev.anyaa.io/graphql"
```


### Running Application Locally

change into the project root directory by running the "cd" command at your terminal

```
cd admin-portal
```

inside project directory run the command to install the dependencies.

```
yarn install OR npm install
```

after installing all the dependencies run the start command to start the application.

```
yarn start OR npm start
```


### Running Docker Containers Development Environment

Run the following command to start the containerized application in development environment.

```
docker-compose -f docker-compose.dev.yml up
```

you can also run the command to start the containerized application in development environment.

```
yarn run docker-dev OR npm run docker-dev
```
