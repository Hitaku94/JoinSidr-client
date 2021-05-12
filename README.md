# Backlog Quest

<br>

## Description

This is an app that connects web developers through their work, become part of our community and show your portfolio to your peers and also to the recruiters.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my backlog
-  **Login:** As a user/recruiter I can login to the platform so that I can start creating and managing my backlog
-  **Logout:** As a user/recruiter I can logout from the platform so no one else can modify my information
-  **Add/Edit/Delete projects** As a user I can add my projects to my profile, edit them and also delete them
-  **Check other users projects** As a user I can see projects from my peers.
-  **Random element** As a user I can get a random element from my backlog
-  **Check profile** As a user I can check my profile and stats
-  **Message** As a user/recruiter I can talk to ther users of the app.


## Backlog

- Follow other users
- post jobs from the recruiter side
- Like from users and Superlike from recruiters to enhance visibility of your projects
-SearchBar

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | Home                     | public `<Route>`            | Home page, links to signin and signup                                       | 
| `/signup`                 | SignupPage                     | public  `<Route>`    | Signup form, link to login, navigate to question form after signup |
| `/signup-form`                 | FormType                     | user only  `<Route>`    | Choose a type of user |
| `/signup-form/workfluencer`                 | SignupForm                     | user only  `<Route>`    |  Form in order to give some information about the user, navigate to profile after submitting |
| `/signup-form/recruiter`                 | SignupForm                     | user only  `<Route>`    |  Form in order to give some information about the user, navigate to profile after submitting |
| `/signin`                  | LoginPage                      | public `<AnonRoute>`     | Login form, link to signup, navigate to profile after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/profile`         | NavBar, ProjectList, ProfileDetail  | user only `<PrivateRoute>`  | Shows some info about user and shows his projects                                |
|`/settings`         | NavBar, ProfileDetail, Settings  | user only `<PrivateRoute>`  | Show users info, edit or delete profile                               |
| `/trends`         | NavBar, ProjectList, | user only `<PrivateRoute>`  | Shows all projects from users                                |
| `/messenger`          | NavBar, Messages| user only `<PrivateRoute>`  | Gives the ability to communicate with the rest of the community                                    |
| `/messenger/:id`          | NavBar, Conversation | user only `<PrivateRoute>`  | Shows conversation with another specific user                                   |
| `/create-project`          | NavBar, ProjectCreate     | user only  `<PrivateRoute>` | Build your project adding info to the form                                |
| `/project/:id`           | Navbar, ProjectDetail      | user only `<PrivateRoute>`  | Render a single                                     |
| `/project-edit/:id`           | Navbar, ProjectEdit      | user only `<PrivateRoute>`  | Edit your project, and delete a single projet                                      |

          

## Components

- Home

- SigninPage

- SignupPage

- FormType

- SignupForm

- NavBar

- FooterBar

- ProfileDetail

- Settings

- SearchForm (backlog)

- SearchResults(backlog)

- ProjectCreate

- ProjectDetail

- ProjectList

- ProjectEdit

- Messages

- Conversation



  

 

## Services

- Auth Service
- Localisation: Country API

- Search Service
  
- External API
  - API for Countries
  - API LinkedIn (backlog)


<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  userType: {type: String, enum:["recruiter", "devUser"]},
  description: String,
  profilePic: String, default: urldefaultpricture,
  country: String,
  expererience: {type: String, enum:["student", "Junior 0-2 years of experience", "Senior 2+ years" ]},
  available: {type:String, enum:["available for work", "unavailable"]},
  workLocation: {type:String, enum:["office", "remote"]} 
  skills: {type:String, enum:["HTML", "CSS", "JavaScript", "React", "Angular", "other"]}
}
```



Project model

```javascript
 {
   title: {type: String, required: true},
   type: {type: String, required: true},
   description: {type: String, required: true},
   date: Date,
   image: {type: String}
   like: Number,
   superlike: Number,
   user: {type: Schema.Types.ObjectId,ref:'User'},
 }
```


<br>


## API Endpoints (backend routes)

- POST/auth/signup
 * body:
    - username
    - email
    - password
- POST/auth/signin
* body:
    - uername
    - password
- POST/auth/logout
    body: (empty)
- GET/messages
- GET/auth/profile
- GET/auth/settings/:id
- PUT/auth/settings/:id
- DELETE/settings/:id
- POST/project-create
- GET/auth/trends
- GET/auth/project/:id
- PUT/auth/project/:id
- DELETE/project/:id





<br>


## Links

### Wireframes
[Link to your whimsical](https://whimsical.com/joinsidr-RyisVZLfQq7xatMpo75FKH) 


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/YanisDim/JoinSidr-client)

[Server repository Link](https://github.com/YanisDim/JoinSidr-server)

[Deployed App Link](Coming Soon)

### Slides

The url to your presentation slides

[Slides Link]()