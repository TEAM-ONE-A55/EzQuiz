# Forum Web Application - EzQuiz

EzQuiz is a forum web application built with React.js for the frontend and Firebase for authentication and database management. The application enables educators to create, share, and participate in quizzes, fostering collaboration and learning in an interactive environment.

## Features

- **User Authentication**: Secure registration, login, and logout using Firebase authentication.
- **Quiz Creation and Management**: Educators can create quizzes, edit their own quizzes, and delete them. Quizzes can be tailored with various question types and scoring mechanisms.
- **Participant Interaction**: Students can participate in quizzes, view ongoing and finished quizzes, and see their results on scoreboards.
- **Group Functionality**: Educators can collaborate in groups to modify quizzes created by fellow educators within the same group.
- **Quiz Browsing**: Users can browse and search for public quizzes based on keywords, categories, or tags.
- **Sample Quiz**: Feature for users to try out a sample quiz without registering.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Navigate into the project directory:
   ```bash
   cd EzQuiz
3. Install dependencies:
   ```bash
   npm install
4. Create a Firebase project and set up authentication and Firestore database.
5. Copy the Firebase configuration and paste it in src/config/firebase-config.js.
6. Start the development server: 
    ```bash
   npm run dev
7. Open your browser and navigate to http://localhost:5173/ to view the application.

## Scheme (structure) of the documents in the database
```js 

{
  groups: {
   - "NtQVJXJZX0L3QH3oCXo": {
      creator: "edu"
      description: "Uniting JavaScript wizards to share, quiz, and code with a sprinkle of magic!"
      image_cover: "https://firebasestorage.googleapis.com/v0/b/ezquiz-b7ac8.appspot.com/o/groups%2Fce806ab8-e3e9-4cbe-9351-81214a6d099c%2F1702904627069.png874f1752-0873-496d-a8eb-e540f33096c0?alt=media&token=5a646977-e50b-4188-9d9e-a26ac0597016"
      name: "JS Masters"
      participants: {
         ariaofficial: "pending"
      }
      quizzes: {
         -NtQUqzgxG3litImegdV: "NtQUqzgxG3litImegdV"
      }
      uuid: "ce806ab8-e3e9-4cbe-9351-81214a6d099c"
   }
  }
  quizzes: {
   - "NtQUqzgxG3litImegdV" : {
      category: 18,
      creator: "edu",
      creatorAvatar: "https://f4.bcbits.com/img/0031181820_25.jpg",
      difficulty: "Easy",
      endDate: "2024-03-31",
      id: "NtQUqzgxG3litImegdV",
      passingScore: "60",
      questions: {}
      quizTakers: {}
      startDate: "2024-03-20",
      timeLimit: "20",
      title: "JS Noobs Quiz",
      visibility: "Public"
   }
  }
  rooms: {
   - "-NtQYs6lRQrR0w1xQksN" : {
      creator: "edu",
      image_cover: "",
      name: "Star Wars Quizzes",
      participants: {},
      quizzes: {},
      uuid: "-92560413-b4d0-4d3c-84ee-6cf4d1a9b48e"
   }
  }
  users: {
   - "ariaofficial": {
      address: "Sofia",
      avatar: "",
      blocked: false,
      createdOn: 1710923527551,
      email: "aria@gmail.com",
      firstName: "Maria",
      handle: "ariaofficial",
      isAdmin: "false",
      lastName: "Tsvetkova",
      phoneNumber: "0877701621"
      role: "educator",
      uid: "KmjIkVyz4VbLJBjqt9TbrcgaFi32"
   }
  }
} 
```

## Usage

- Register or login to access the platform.
- Educators can create quizzes, manage their quizzes, and invite students to participate.
- Students can participate in quizzes, view scoreboards, and engage in learning activities.
- Explore different quizzes and categories available on the platform.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Technologies Used

- React
- Firebase
- JavaScript
- Tailwind

## Contributors

- Gabriela Evtimova
- Georgi Popov
- Ivelin Nenov

### Test Accounts:
- Student: 
  - email: nerd@gmail.com
  - pass: 123456
- Educator: 
  - email: edu@gmail.com
  - pass: 123456
- Admin:
  - email: boss@admin.com
  - pass: 123456

### Registration - Verification code for Educators:
- 1234
