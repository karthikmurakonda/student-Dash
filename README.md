# student-network

A college-centric networking site that offers academic, cultural and social media integration for all students. Run as an independent student-driven site it will be completely customizable according to the students and their needs. It tries to organise all academic activities and recreational activities under one roof regardless of the platform on which they are conducted, whether they are online or offline.

## App structes

Our project is mainly divided into two main parts:

- client-side: the front-end part of the app.
- server-side: the back-end part of the app.

Our client and server are separated and communicate via a RESTful API.
See [client](./Client/README.md) and [server](./Client/README.md) for more details.

```
.
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── index.html
│   │   └── robots.txt
│   └── src
│       ├── components
│       │   ├── App
│       │   │   ├── App.jsx
│       │   │   └── UserRoute.jsx
│       │   ├── CourseManage
│       │   │   ├── ClassList
│       │   │   │   ├── AddClassForm.jsx
│       │   │   │   ├── ClassList.jsx
│       │   │   │   └── ListItem.jsx
│       │   │   └── CourseManage.jsx
│       │   ├── CoursePlanner
│       │   │   ├── AddCourse
│       │   │   │   ├── ListCourses.jsx
│       │   │   │   └── SearchItem.jsx
│       │   │   ├── CourseList
│       │   │   │   ├── Clashes.jsx
│       │   │   │   ├── CourseItem.jsx
│       │   │   │   └── CourseList.jsx
│       │   │   ├── Courseplanner.jsx
│       │   │   └── Timetable.jsx
│       │   ├── Loading
│       │   │   ├── Loading.jsx
│       │   │   └── styles.css
│       │   ├── Login.jsx
│       │   ├── Navbar
│       │   │   ├── LoginUtil.jsx
│       │   │   ├── MyNav.jsx
│       │   │   └── UserNavs.jsx
│       │   ├── Poster
│       │   │   ├── Poster.jsx
│       │   │   └── styles.css
│       │   └── Signup.jsx
│       ├── hooks
│       │   ├── AuthContext.jsx
│       │   ├── CPContext.jsx
│       │   └── useLocalStorage.jsx
│       ├── index.js
│       └── styles.css
└── server
    ├── models
    │   ├── courses.js
    │   ├── plugings
    │   │   ├── index.js
    │   │   ├── paginate.plugin.js
    │   │   └── toJSON.plugin.js
    │   ├── posts.js
    │   └── user.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── auth.js
    │   ├── courses.js
    │   ├── index.js
    │   └── posts.js
    ├── server.js
    └── utlils
        └── pick.js
```

### Client
It has all the logic and UI for the Project. Our Frontend is built using React.js, UI is built using React-Bootstrap. To send http requests to the backend we have used axios.

### Server
It has all the server side code especially the database and authentication. Built using Node.js, moongose.js and Express.js. It is a RESTful API service that is used to communicate with the client. Authentication is done using Passport.js with local and session strategy.

## Setup
See [SETUP.md](./SETUP.md) to setup the project.

## Github
Check our [github](https://github.com/karthikmurakonda/student-Dash) page.

## Contributors
- [Om Patil](https://www.github.com/mordernoctave)
- [Karthik mv ](https://www.github.com/karthikmurakonda)
- [Vidyasagar S](https://https://github.com/Vss4969)

Pull requests are welcome!
