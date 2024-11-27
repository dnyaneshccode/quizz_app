const request = require('supertest');
const app = require('./src/app'); // Adjust path if necessary
const mongoose = require('mongoose'); // Import mongoose to disconnect after tests

// Mock console.log to suppress logging during tests
jest.spyOn(console, 'log').mockImplementation(() => {});

beforeAll(async () => {
  // Ensure MongoDB connection before running tests
  await mongoose.connect(process.env.MONGO_URI, {});
});

// After all tests are done, disconnect the database to clean up
afterAll(async () => {
  // Close the mongoose connection after tests to prevent issues during cleanup
  await mongoose.connection.close();
});

describe('Test Welcome Message Route', () => {
  it('should return a welcome message with status code 200', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.status_code).toBe(200);
    expect(response.body.message).toBe(
      'Welcome to the Quiz Application Backend',
    );
    expect(response.body.data).toEqual({});
  });
});

// Test Create Quiz Route
describe('Test Create Quiz Route', () => {
  it('should create a new quiz with a set of questions', async () => {
    const newQuiz = {
      title: 'JavaScript Basics',
      questions: [
        {
          text: "What is the output of '2' + 2 in JavaScript?",
          options: ['22', '4', 'NaN', 'Error'],
          correct_option: 0,
        },
        {
          text: 'Which of these is not a JavaScript data type?',
          options: ['String', 'Number', 'Boolean', 'Float'],
          correct_option: 3,
        },
      ],
    };

    const response = await request(app)
      .post('/api/create_quiz')
      .send(newQuiz)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Quiz created successfully');
    expect(response.body.data.title).toBe(newQuiz.title);
    expect(response.body.data.questions.length).toBe(newQuiz.questions.length);
  });
});

// Test Fetch Quiz by ID Route
describe('Test Fetch Quiz by ID Route', () => {
  it('should fetch a quiz by its ID without revealing the correct answers', async () => {
    // Assuming you have a quiz with this ID in your test DB
    const quizId = '6745a320a1522e3c8a3c6c8f';

    const response = await request(app)
      .get(`/api/get_quiz/${quizId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data._id).toBe(quizId);
    expect(response.body.data.questions[0].correct_option).toBeUndefined(); // Ensure correct_option is not included
  });
});

// Test Submit Answer Route
describe('Test Submit Answer Route', () => {
  it('should submit an answer for a specific question in a quiz', async () => {
    const answer = {
      quizId: '6746828118deb73839e8d879',
      questionId: '6746828118deb73839e8d87b',
      selected_option: 3,
      userId: '554590cf81d5f645debeff32',
    };

    // Sending the POST request to the correct route
    const response = await request(app)
      .post('/api/submit_answer') // Ensure this path matches your route handler
      .send(answer)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200); // Ensure it returns status 200
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Correct answer!');
  });
});
// Test Get Quiz Results Route
describe('Test Get Quiz Results Route', () => {
  it('should fetch the quiz results for a user', async () => {
    const quizId = '6746828118deb73839e8d879';
    const userId = '554590cf81d5f645debeff32';

    const response = await request(app)
      .get(`/api/get_results?quiz_id=${quizId}&user_id=${userId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.quiz_id).toBe(quizId);
    expect(response.body.data.user_id).toBe(userId);
    expect(response.body.data.score).toBeDefined();
  });
});
