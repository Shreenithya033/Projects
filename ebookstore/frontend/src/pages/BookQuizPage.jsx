import React from 'react';
import BookQuiz from '../components/BookQuiz';

const BookQuizPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📘 Book Quiz</h1>
      <BookQuiz />
    </div>
  );
};

export default BookQuizPage;
