# Backlog Quest

<br>

## Description

This is an app that aims to connect web developers through their work to become part of our community. Using JoinSidr helps web developers show their portfolio not only to their peers but also to recruiters who can find here their next talent.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anon I can sign up in the platform so that I can start accessing my profile for the first time and I can make the choice of being a recruiter or a web developer.
- **Login:** As a user/recruiter I can login to the platform so that I can access to my profile. I can sign in with my google or linkedin account as well.
- **Logout:** As a user/recruiter I can logout from the platform so no one else can modify my information.
- **Add/Edit/Delete projects** As a user I can add my projects to my profile, edit them and also delete them.
- **Add/Edit/Delete jobs** As a user I can publish job offers, edit them and also delete them. The jobs are also available for web developers accounts to check.
- **Check other users projects** As a user I can see projects from other web developers.
- **Random element** As a user I can acces a random user's profile, or project, I can follow or unfollow them.
- **Check profile** As a user I can check my profile and I can also see the profiles from other users.
- **Message** As a user/recruiter I can talk to other user in private discussions.
- **Trends/Jobs** As a user/recruiter I can see all the projects and jobs posted from other users.
- **Delete account** As a user/recruiter I also have the possibility to delete my account.

## Backlog

- Follow other users
- post jobs from the recruiter side
- Like from users and Superlike from recruiters to enhance visibility of your projects
  -SearchBar

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                | Component                          | Permissions                | Behavior                                                           |
| ------------------- | ---------------------------------- | -------------------------- | ------------------------------------------------------------------ |
| `/`                 | Home                               | public `<Route>`           | Home page, links to signin and signup                              |
| `/signup`           | SignupPage                         | public `<Route>`           | Signup form, link to login, navigate to question form after signup |
| `/choice-page`      | FormType                           | user only `<Route>`        | Choose a type of user                                              |
| `/signin`           | LoginPage                          | public `<AnonRoute>`       | Login form, link to signup, navigate to profile after login        |
| `/logout`           | n/a                                | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session                  |
| `/profile`          | NavBar, ProjectList, ProfileDetail | user only `<PrivateRoute>` | Shows some info about user and shows his projects                  |
| `/settings`         | NavBar, ProfileDetail, Settings    | user only `<PrivateRoute>` | Show users info, edit or delete profile                            |
| `/trends`           | NavBar, ProjectList,               | user only `<PrivateRoute>` | Shows all projects from users                                      |
| `/messenger`        | NavBar, Messages                   | user only `<PrivateRoute>` | Gives the ability to communicate with the rest of the community    |
| `/messenger/:id`    | NavBar, Conversation               | user only `<PrivateRoute>` | Shows conversation with another specific user                      |
| `/create-project`   | NavBar, ProjectCreate              | user only `<PrivateRoute>` | Build your project adding info to the form                         |
| `/project/:id`      | Navbar, ProjectDetail              | user only `<PrivateRoute>` | Render a single project                                            |
| `/project-edit/:id` | Navbar, ProjectEdit                | user only `<PrivateRoute>` | Edit your project, and delete a single projet                      |
| `/create-job`       | NavBar, ProjectCreate              | user only `<PrivateRoute>` | Build your job offer adding info to the form                       |
| `/job/:id`          | Navbar, ProjectDetail              | user only `<PrivateRoute>` | Render a single job                                                |
| `/job-edit/:id`     | Navbar, ProjectEdit                | user only `<PrivateRoute>` | Edit your job offer, and delete a single job                       |

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
- JobCreate

- JobDetail

- JobList

- JobEdit

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
 username: {type: String},
    firstName: String,
	  lastName: String,
    email: {type: String, required: true, unique: true},
    password: {type: String,},
    googleId: String,
    linkedInId: String,
    userType: {type: String, enum:["Recruiter", "Workfluencer"]},
    description: String,
    profilePic: {type: String, default: "/images/profileIcon.png",},
    country: String,
    experience: {type: String, enum:["student", "Junior 0-2 years of experience", "Senior 2+ years" ]},
    available: String,
    workLocation: {type:String},
    linkedinUrl: String,
    githubUrl: String,
    skills:[String],
    follow: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
    }
```

Project model

```javascript
 {
   title: {
      type: String,
       required: true
      },
    type: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
    },
    date: Date,
    image: {
      type: String
    },
    like: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    superlike: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    urlProject: {
      type: String
    },
    urlGit: {
      type: String
    },
    languages: [String],

 }
```

Job model

```javascript
 {
  title: {
      type: String,
      required: true
      },
    type: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
    },
    date: Date,
    image: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref:"User",
    },
    languages: [{
      type: String
    }],
    location: {
      type: String
    },
  

 }
```

Message model

```javascript
 {
  sender: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  message: String,
  conversationId : {
    ref: 'conversation',
    type: Schema.Types.ObjectId
  } 
}, {
  timestamps: true
}
 }
```

Conversational model

```javascript
 {
 participants: [{
      ref: 'User',
      type: Schema.Types.ObjectId
    },
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
- GET/allMesages
- POST/messages/:id_User1/:id_User2
- GET/messages/:id_message
- GET/profile/:id (userinfo and his projects)
- GET/settings
- PUT/settings
- DELETE/settings
- POST/project-create
- GET/trends
- GET/project/:id
- PUT/project/:id
- DELETE/project/:id
/p
<Tr>

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
