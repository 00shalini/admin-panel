# Admin panel

## For installing the project on your localhost

1. Open git bash inside the folder you want to clone the repository.
2. Type command git clone https://github.com/00shalini/admin-panel.git folder name !Folder name is optional.
3. Navigate to the project root folder and type command npm install.
4. Run npm start to start the project 
5. To start the backend navigate inide the backend folder and run nodemon index.js

### Design 


#### Login page

![Screenshot 2023-05-09 195852](https://github.com/00shalini/admin-panel/assets/61345989/a67a4fff-694d-40f0-bd06-9b9607a08ae6)

### Admin panel

![Screenshot 2023-05-09 200015](https://github.com/00shalini/admin-panel/assets/61345989/e97719b2-be07-4290-b742-4e2357ef4a21)

## Deployment

Deploying a React app on Netlify is relatively straightforward. Here's a step-by-step guide:

Build your React app by running the following command in your project directory:

`npm run build`

This command will generate a build directory with all the compiled assets and files that are needed to serve your app.

Create an account on Netlify if you don't have one already. You can sign up for free at https://app.netlify.com/signup.

Once you've signed in to Netlify, click on the "New site from Git" button on the dashboard.

Choose your Git provider (GitHub, GitLab, or Bitbucket) and select the repository that contains your React app.

Select the branch you want to deploy (usually the main or master branch).

In the "Publish directory" field, enter:

./build

Click on the "Deploy site" button. Netlify will build and deploy your app, and you should see a URL for your app once the process is complete.
That's it! Your React app should now be live on the internet and accessible via the URL provided by Netlify.
