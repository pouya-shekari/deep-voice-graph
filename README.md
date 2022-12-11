This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Table of Contents
1. [Available Scripts](#available-scripts)
2. [File Structure](#file-structure)
3. [Pages and Components](#pages-components)
    - [Pages](#pages)
    - [Components](#components)
4. [Styles](#styles)
5. [Packages](#packages)
6. [License](#license)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## File Structure
While the `Deep Voice Graph` does primarily rely on the standard file structure of a React.js project (anchored around the /pages directory), a few additions have been made. The following outlines the full structure of the `Deep Voice Graph`:

```
├── node_modules
├── public
|   ├── favicon.ico
|   ├── index.html
|   ├── manifest.json
|   ├── robots.txt
|   ├── logo192.png
|   └── logo512.png
├── src
|   ├── assets
|   |   ├── fonts
|   |   ├── media
|   |   ├── styles
|   |   |   └── globals.css
|   ├── components
|   |   ├── Flow
|   |   |   ├── Add
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   |   ├── Chart
|   |   |   |   ├── AddResource
|   |   |   |   |   ├── NoOption
|   |   |   |   |   |   ├── index.jsx
|   |   |   |   |   |   └── index.test.jsx
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Reset
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   ├── index.module.scss
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Save
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   ├── index.module.scss
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   |   ├── CustomNodes
|   |   |   |   ├── Action
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Announcement
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Checker
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── End
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Forward
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Question
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Start
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── index.module.scss
|   |   |   ├── DragableNodes
|   |   |   |   ├── Node
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   ├── index.module.scss
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── index.jsx
|   |   |   |   ├── index.module.scss
|   |   |   |   └── index.test.jsx
|   |   |   ├── Edit
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   |   └── List
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   ├── HOC
|   |   |   └── RequireAuth
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   ├── LoginForm
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── OverviewCard
|   |   |   ├── index.jsx
|   |   |   ├── index.module.scss
|   |   |   └── index.test.jsx
|   |   ├── Resources
|   |   |   ├── Action
|   |   |   |   ├── Add
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Delete
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Edit
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── List
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   ├── Announcement
|   |   |   |   ├── Add
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Delete
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Edit
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── List
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   ├── Checker
|   |   |   |   ├── Add
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Delete
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Edit
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── List
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   └── Question
|   |   |   |   ├── Add
|   |   |   |   |   ├── Answer
|   |   |   |   |   |   ├── index.jsx
|   |   |   |   |   |   └── index.test.jsx
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Delete
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   ├── Edit
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── List
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   ├── UI
|   |   |   ├── Breadcrumbs
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.module.scss
|   |   |   ├── Header
|   |   |   |   └── index.jsx
|   |   |   ├── Loading
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   |   ├── Modal
|   |   |   |   ├── ConfirmationModal
|   |   |   |   |   └── index.jsx
|   |   |   |   ├── Transition
|   |   |   |   |   └── index.jsx
|   |   |   |   └── index.jsx
|   |   |   ├── Snak
|   |   |   |   └── index.jsx
|   |   |   ├── Table
|   |   |   |   ├── Simple
|   |   |   |   |   └── index.jsx
|   |   |   |   ├── WithCollapseRow
|   |   |   |   |   ├── Row
|   |   |   |   |   |   ├── index.jsx
|   |   |   |   |   |   └── index.test.jsx
|   |   |   |   |   ├── index.jsx
|   |   |   |   |   └── index.test.jsx
|   |   |   |   └── index.jsx
|   |   |   └── Theme
|   |   |   |   └── index.jsx
|   ├── constants
|   |   ├── APPLICATIONID.js
|   |   ├── BASEURL.js
|   |   ├── CUSTOMNODETYPES.js
|   |   ├── DEAFAULTEDGESPOPTIONS.js
|   |   ├── NODETYPES.js
|   |   ├── OVERVIEWITEMS.js
|   |   └── PATHS.js
|   ├── context
|   |   ├── Auth.js
|   |   ├── Modal.js
|   |   └── Snak.js
|   ├── hooks
|   |   ├── useAuth.js
|   |   ├── useModal.js
|   |   └── useSnak.js
|   ├── layouts
|   |   ├── User
|   |   |   └── index.layout.jsx
|   ├── lib
|   |   └── axios.js
|   ├── routes
|   |   └── App.routes.js
|   ├── services
|   |   ├── actions
|   |   |   ├── createAction.js
|   |   |   ├── deleteAction.js
|   |   |   ├── getActions.js
|   |   |   └── updateChecker.js
|   |   ├── announcements
|   |   |   ├── createAnnouncement.js
|   |   |   ├── deleteAnnouncement.js
|   |   |   ├── getAnnouncements.js
|   |   |   └── updateAnnouncement.js
|   |   ├── auth
|   |   |   ├── login.js
|   |   |   └── logout.js
|   |   ├── checkers
|   |   |   ├── createChecker.js
|   |   |   ├── deleteChecker.js
|   |   |   ├── getChecker.js
|   |   |   └── updateChecker.js
|   |   ├── flows
|   |   |   ├── createFlow.js
|   |   |   ├── getFlowById.js
|   |   |   ├── getFlows.js
|   |   |   ├── lockFlow.js
|   |   |   ├── updateFlow.js
|   |   |   └── updateFlowStates.js
|   |   ├── questions
|   |   |   ├── createQuestion.js
|   |   |   ├── deleteQuestion.js
|   |   |   ├── getQuestions.js
|   |   |   ├── getUsedQuestions.js
|   |   |   └── updateQuestion.js
|   ├── utils
|   |   ├── actionValidator
|   |   |   └── index.js
|   |   ├── announcementValidator
|   |   |   └── index.js
|   |   ├── checkerValidator
|   |   |   └── index.js
|   |   ├── convertors
|   |   |   ├── convertBreadcrumbsToPersian.js
|   |   |   ├── convertFlowFromNeo4j.js
|   |   |   ├── convertFlowToNeo4j.js
|   |   |   └── convertNodeNames.js
|   |   ├── faToEnDigits
|   |   |   └── index.js
|   |   ├── flowValidator
|   |   |   ├── allowToAddResource.js
|   |   |   ├── index.js
|   |   |   └── isFlowValid.js
|   |   ├── localStorageHelper
|   |   |   └── index.js
|   |   ├── login-form-validator
|   |   |   ├── password.validator.js
|   |   |   └── username.validator.js
|   |   ├── QuestionValidator
|   |   |   └── Title
|   |   |   |   ├── index.jsx
|   |   |   |   └── index.test.jsx
|   |   ├── waitTimeValidator
|   |   |   └── index.js
|   ├── views
|   |   ├── Actions
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── Announcements
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── Checkers
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── Dashboard
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── Graph
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── Login
|   |   |   ├── index.jsx
|   |   |   ├── index.module.scss
|   |   |   └── index.test.jsx
|   |   ├── Questions
|   |   |   ├── index.jsx
|   |   |   └── index.test.jsx
|   |   ├── index.js
|   |   └── setupTests.js
|   ├── .gitignore
|   ├── craco.config.js
|   ├── jsconfig.js
|   ├── package.json
|   ├── package-lock.json
|   └── README.md
```
For more information you can see [file structure diagram](https://drive.google.com/drive/folders/11kadG789CCZBWgdKudZQVFxLqvhykOnh).

## Views & Components
For components, there are two conventions in use: the `/views` directory that App.routes.js uses for routing and rendering, and a custom directory components that contains a mix of React components used to build out the user interface.

### Views
There are two types of pages in the project: route pages and base pages. Route pages describe the page components contained in each of the folders inside the `/views` directory.

Route pages is a generic term used to describe the pages rendered by React.js, located in the folders within the `/views` directory. These folders (and the files they contain) map to the current URL in the browser.

### Components
Though technically speaking the pages in the projects are React components, as their name implies, they're intended to be pages rendered by the Next.js router, not standalone components.

To fill in this gap, we add a `/components` directory at the root of the project. This folder is designed to contain sub-folders, with each sub-folder representing one component in the app.

As a naming convention, **folder names are given the pascal-case name of the component**.
For more information you can see [components diagram](#).

## Styles
CSS styles are implemented in two ways in the `Deep Voice Graph`. Global styles (not page or component-specific styles) are implemented using React.js built-in CSS processing. These styles are located in the `src/asstes/styles` directory.

At the page and component-level, CSS styles are implemented using `SCSS Module`.

## Packages
In this project we use some third parties. Third party packages listed [here](https://docs.google.com/document/d/1tlwRgQ-f2ghZm4-rMLU_Fn2rSExFzuvisPO-cADqgzc/).

## License
Copyright © 2022 HARA
