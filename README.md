# Welcome to News Aggregator App

This project is a news aggregator application that gathers news from three different sources, providing users with a centralized platform to stay updated with the latest news. Using this application you can view News from following sources

1. News - To view complete documentation please visit [News API Documentation](https://newsapi.org/docs/endpoints).
2. New York Times `(Top Stories Only)` - To view complete documentation please visit [New York Times API Documentation](https://developer.nytimes.com/docs/top-stories-product/1/overview).
3. The Guardian News [Guardian News API Documentation](https://open-platform.theguardian.com/documentation/).

## Running Project

### Using Docker

For Running project using docker make sure `docker demon` is installed on system and is running

Enter following command to start project

#### `docker compose up`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
This will pick up all the configurations from `docker-compose.yml` file in one go.

### Using npm

Make sure node dependencies are install. This can be done using following command:

#### `npm i`

Once all package are installed enter following command in terminal to run project

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

##### `Note: Test not written to limit the scope of the evaluation as was not part of requirement - can be written if required`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Best Practices

### Axios Instance

#### Eslint

All eslint rules have been strictly followed and are configured/defined in eslintrc.js file. Project won't compile successfully if there are any eslint errors

#### Prettier

This project uses prettier for proper code formatting, along with that prettier-plugin-tailwindcss is used to properly format tailwind classes

#### Axios Instance

Separate Instance of axios are created and configured for each endpoint provider so that we don't need to configure/pass api-key and endpoint on each request hence resulting in less maintenance.
Along with that custom hook `useAxios` is used to call all the API's from one central point instead of configuring axios again and again for separate API calls

#### Typescript

This project uses typescript for strict type checking to prevent any unwanted errors.

#### Code Reusability

This project consists of reusable components that are stored on `components` folder, whereas reusable function are stores in utils, constant in constant folder and reusable common types are stored in types folder. This helps achieving DRY principal.

#### Layout

To serve the same purpose of implementing DRY principal and enhance reusability layouts are created that can be found in `layout` folder. This project consists of only one layout i-e MainLayout which is used to wrap each page with header and footer.

#### Separation of concerns and Modularity

This project has a project structure that respects separation of concerns principal and Modularity by having separate component/module for separate UI or Functionality where as all the functional implementation for that component can be found inside hight level of that module i-e on Page level or on Module level.

#### Error Handling

Not much error handling was required as after trying brute force testing there were hardly any crashes as all the rules are implemented on the frontend side, Just in case if something goes wrong errors are displayed using snackbar.

#### Mobile Responsive

basic level mobile responsive is implemented so the website is easily accessible and viewable on different screen sizes

#### UI Library

Modern UI library `Tailwind` is configured in project, tailwind.config is not much utilized as project uses basic tailwind orange cover. If required proper theming can be implemented using tailwind config file - `Currently not scoped to this project`

#### .env

Project contains .env file to store and access baseUrls and keys so that they can easily be updated such as for different environments and are not part of code base. `However .env is part of repository so that it is easy for the evaluator to run project, once project is evaluated all the keys will be either changed or removed`

## Folder Structure

1. Utils - Contains all the reusable utility functions.
2. api - contains axios Instance file used to create multiple axios instance with separate config for each endpoint provider to config everything in one point
3. components - contains relatively small reuseable components.
4. constants - contains constants either to be reused or to cleanup code in component.
5. hooks - contains custom hooks for increasing efficiency such as useDebounce for reducing api calls on searching for record.
6. Icons - contains adaptive icons that are used around the project.
7. layout - Contains Project layout i-e MainLayout, which serves purpose to add header and footer in one place instead of adding it on each route.
8. modules - Relatively bigger components or a complete module.
9. pages - Whole page that renders on each route.
10. types - consists of reuseable types for typescript support.

## Further Improvements

This project can be further improved by adding Error Boundaries, Unit tests and a bit of refactoring but as the project was scaling a lot so some of the functionalities were not implemented as the current implementation seemed sufficient to provide proof of concept and domain knowledge, however missing functionalities can be implemented if required.

Tailwind.config can further be utilized for theming of the project - Not configured at the moment as project uses basic tailwind orange color. If required proper theming can be implemented to make project more customizable, `Currently not required in this project`

Moreover Maximum number of filters are applied on each page as mentioned in the documentation but few more filters can still be applied if required such as in `New York Times` only `Top-Stories` section is implemented as it seemed more relevant.

Further more `husky` can be installed as a pre-commit hook to insure all best practices are followed before making a commit - not required in this project as there is only one contributor.
