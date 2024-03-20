## EzQuiz React Project

EzQuiz is an innovative platform designed for creating, sharing, and participating in quizzes. It is a comprehensive solution for educators, recruiters, and enthusiasts to craft quizzes tailored to their needs. The platform has features like public and private quiz settings, a searchable quiz database, and a scoreboard for participant rankings.

## Project Description

The application has two main parts:

1. **Organizational**: Here, educators can create and manage quizzes.
2. **For Students**: Everyone is welcome to register and participate in quizzes. Students can also be invited by educators to become educators.

## Functional Requirements

### Entities

- **Authentication**: Handled by Firebase, no need for an auth entity.
- **User**: Must have a username, email, phone number, and photo. Users should have a first name and a last name. Users can either be organizers or students.
- **Quiz**: Must have an id, title, category, type of the quiz (open or invitational), a set of questions, options for answers, and a scoring mechanism.
- **Scoreboard**: There could be scoreboards for users who completed quizzes in different categories.
- **Search Functionality**: Feature to search available public quizzes by keywords, categories, or tags.
- **Groups of Educators**: Educators should be able to participate in groups. Each educator has the right to modify tests made by educators from their group and is not able to modify tests made by educators outside their group.

### Public Part

- **Landing Page**: Showcases the latest quizzes or other compelling content.
- **Login Form**: Allows users to log in with their username and password.
- **Register Form**: Registers users as Educators or Students. Requires username, first name, last name, and password.
- **Quiz Browsing**: Allows anonymous users to browse and search for public quizzes.
- **Sample Quiz**: Feature for users to try out a sample quiz without registering.

### Private Part

Accessible only to authenticated users.

#### For Educators:

- **Create Quiz**: Ability to set up a new quiz with custom questions and answers.
- **Quiz Management**: Manage quizzes including editing or deleting them.
- **Invite Students**: Ability to invite students to take quizzes.
- **View Quizzes**: View ongoing and finished quizzes.

#### For Students:

- **View Active Quizzes**: See active quizzes available for participation.
- **View Participation**: View quizzes the student is currently participating in.
- **View Scoreboards**: View scoreboards of quizzes they participated in.

#### Profile Editing

All users must be able to see and edit their profile information but cannot change their username.

#### Quiz Requirements

- **Quiz Participation**: Users can participate in multiple quizzes and see their results on respective scoreboards.
- **Invitation Acceptance**: Users can accept or reject invitations to private quizzes.
- **Quiz Settings**: Creators can set time limits, question order randomization, and passing scores for their quizzes.

### Administrative Part

Accessible to users with administrative rights.

- **User Management**: Admins can search for users, block/unblock users.
- **Quiz Management**: Admins can edit or delete any quiz.
- **Scoreboard Moderation**: Admins can oversee scoreboards for tests and address discrepancies.

### Educator Groups

Educators should be separated into groups. Educators in the same group can edit or delete any quiz created by someone on their team.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

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
  - email: student@test.com
  - pass: 123456
- Educator: 
  - email: edu@test.com
  - pass: 123456
- Admin:
  - email: boss@admin.com
  - pass: 123456

### Registration - Verification code for Educators:
- 1234
