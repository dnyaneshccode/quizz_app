# Quiz App API

A Node.js API for a quiz application that allows users to create quizzes, submit answers, and retrieve results.

## Table of Contents
1. [Project Setup](#project-setup)
   - [Run with Docker](#run-with-docker)
   - [Run without Docker](#run-without-docker)
2. [API Endpoints](#api-endpoints)
   - [Create a New Quiz](#1-create-a-new-quiz)
   - [Fetch a Quiz by ID](#2-fetch-a-quiz-by-id)
   - [Submit an Answer](#3-submit-an-answer)
   - [Get Results](#4-get-results)

## Project Setup

### Run with Docker

1. **Install Docker:**
   - Make sure Docker is installed on your machine. You can download Docker from [here](https://www.docker.com/get-started).

2. **Clone the repository:**

   ```bash
   git clone https://github.com/dnyaneshccode/quizz_app.git
   cd quiz-app

3. **Build and Run the Containers:**
    - docker-compose up --build

4. **Access the API:**

5. **Stopping the Containers:**
    - docker-compose down




### Run without Docker
1. **Clone the repository:**
   - git clone https://github.com/dnyaneshccode/quizz_app.git
   - cd quiz-app


2. **Install Dependencies:**
   - npm install


3. **Set Environment Variables:**
   - MONGO_URI=mongodb://localhost:27017/quiz_app
   - NODE_ENV=development


4. **Run the Application:**
   - npm run dev

**************************************API ENDPOINTS*******************************************

### API Endpoints

1. **Create a New Quiz:**
    URL - http://127.0.0.1:3000/api/create_quiz
    METHOD - POST
    REQUEST BODY - :
            {
                "title": "JavaScript Basics",
                "questions": [
                    {
                    "text": "What is the output of '2' + 2 in JavaScript?",
                    "options": [
                        "22",
                        "4",
                        "NaN",
                        "Error"
                    ],
                    "correct_option": 1
                    },
                    {
                    "text": "Which of these is not a JavaScript data type?",
                    "options": [
                        "String",
                        "Number",
                        "Boolean",
                        "Float"
                    ],
                    "correct_option": 3
                    }
                ]
        }


2. **Fetch a Quiz by ID:**
    URL - http://127.0.0.1:3000/api/get_quiz/:id
    METHOD - GET
    DESCRIPTION - Fetch a quiz by its ID without revealing the correct answers.



3. **Submit an answer for a specific question in a quiz:**
    URL - http://127.0.0.1:3000/api/submit_answer
    METHOD - POST
    DESCRIPTION - Submit an answer for a specific question in a quiz.
    REQUEST BODY - {
                        "quizId": "674590cf81d5f645debeff2f",
                        "questionId": "674590cf81d5f645debeff31",
                        "selected_option": 0,
                        "userId": "554590cf81d5f645debeff32"
                    }
    



4. **Retrieve the user's results for a specific quiz:**
    URL - http://127.0.0.1:3000/api/get_results
    METHOD - GET
    DESCRIPTION - Fetch a quiz by its ID without revealing the correct answers.
    Request Parameters:
        quiz_id: The ID of the quiz.
        user_id: The ID of the user.
        http://127.0.0.1:3000/api/results?quiz_id=674590cf81d5f645debeff2f&user_id=554590cf81d5f645debeff32



5. **Update Quiz:**
    URL - http://127.0.0.1:3000/api/update_quiz/:id
    METHOD - PATCH
    DESCRIPTION - Update a quiz by its ID.
    REQUEST BODY - :
            {
                "title": "Updated Quiz Title",
                "description": "This is an updated description for the quiz.",
                "questions": [
                    {
                        "text": "What is the capital of France?",
                        "options": [
                            "Berlin",
                            "Madrid",
                            "Paris",
                            "Rome"
                        ],
                        "correct_option": 2
                    },
                    {
                        "text": "Which planet is known as the Red Planet?",
                        "options": [
                            "Earth",
                            "Mars",
                            "Jupiter",
                            "Venus"
                        ],
                        "correct_option": 1
                    },
                    {
                        "text": "What is 2 + 2?",
                        "options": [
                            "3",
                            "4",
                            "5",
                            "6"
                        ],
                        "correct_option": 1
                    }
                ]
}


5. **Delete Quiz:**
    URL - http://127.0.0.1:3000/api/delete_quiz/:id
    METHOD - DELETE
    DESCRIPTION - Delete a quiz by its ID.



*****************************FOR RUNNING TEST CASES FOLLOW ABOVE INSTRUCTIONS****************************

1. **In app.js file comment this line. ==>** app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

2. **Then add this line of code in app.js file I have allready added just uncomment that line.** ==> module.exports = app;

3. Inside the app.test.js file all the written test are available make sure you have to passed the correct quiz, user, question ids of the respective records and that records should be available in your local database.

4. **After adding the ids in app.test.js file run the command. ==>** npm test

5. **For running the test cases run the command. ==>** npm test

6. I have tested at my local all the test case has been passed