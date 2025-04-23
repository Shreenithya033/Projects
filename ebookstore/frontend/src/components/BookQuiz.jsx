import React, { useState } from 'react';

const BookQuiz = () => {
  const questions = [
    {
      question: "What does the spell 'Alohomora' do?",
      options: ["Summons a wand", "Unlocks doors", "Turns invisible", "Makes tea"],
      answer: "Unlocks doors",
    },
    {
      question: "Which instrument does a certain famous detective enjoy playing?",
      options: ["Piano", "Violin", "Poirot", "Marple"],
      answer: "Violin",
    },
    {
      question: "What is considered a 'ruler’s' greatest strength in ancient political texts?",
      options: ["Swordsmanship", "Gold reserves", "Clever advisors", "Royal elephants"],
      answer: "Clever advisors",
    },
    {
      question: "Which book series features a character named 'Frodo'?",
      options: ["Harry Potter", "The Hobbit", "The Chronicles of Narnia", "The Lord of the Rings"],
      answer: "The Lord of the Rings",
    },
    {
      question: "What is the name of Sherlock Holmes' assistant?",
      options: ["Watson", "Wilson", "Winston", "Walter"],
      answer: "Watson",
    },
    {
      question: "In the wizarding world, how do students receive their school letters?",
      options: ["Pigeon", "Magical Owl", "Floo Network", "Enchanted broom delivery"],
      answer: "Magical Owl",
    },
    {
      question: "Which of the following strategies is considered most dangerous for a ruler in maintaining power?",
      options: [
        "Fostering loyalty through rewards and privileges",
        "Surrounding oneself with equally powerful individuals",
        "Relying on the support of the military to maintain control",
        "Granting autonomy to local leaders and communities"
      ],
      answer: "Surrounding oneself with equally powerful individuals",
    },
    {
      question: "In business, if your competitor knows your every move, how can you maintain the upper hand?",
      options: [
        "Increase transparency to build trust",
        "Diversify your strategies and keep evolving",
        "Use their knowledge against them by setting traps",
        "Slow down and make them overestimate your plans"
      ],
      answer: "Diversify your strategies and keep evolving",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState('');
  const [coupon, setCoupon] = useState('');

  const handleSubmit = () => {
    let updatedScore = score;

    if (selected === questions[current].answer) {
      updatedScore += 1;
    }

    if (current + 1 < questions.length) {
      setScore(updatedScore);
      setCurrent(current + 1);
      setSelected('');
    } else {
      setScore(updatedScore);
      setSubmitted(true);
      generateCoupon(updatedScore);
    }
  };

  const generateCoupon = (finalScore) => {
    const suffix = Date.now().toString().slice(-4);
    if (finalScore >= 7) {
      setCoupon(`BOOKQUIZ10-${suffix}`);
    } else if (finalScore >= 5) {
      setCoupon(`BOOKQUIZ6-${suffix}`);
    } else if (finalScore >= 2) {
      setCoupon(`BOOKQUIZ2-${suffix}`);
    } else {
      setCoupon('');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 text-white p-6 rounded-xl shadow-md">
      {!submitted ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{questions[current].question}</h2>
          {questions[current].options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selected === option}
                  onChange={(e) => setSelected(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className={`mt-4 px-4 py-2 rounded font-semibold ${
              selected
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            {current + 1 === questions.length ? "Submit Quiz" : "Next"}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            You scored {score} / {questions.length}
          </h2>
          {coupon ? (
            <p className="text-green-400 text-xl">
              🎉 Congrats! Your coupon: <strong>{coupon}</strong>
            </p>
          ) : (
            <p className="text-red-400 text-lg">
              😢 No coupon this time. Try again to win!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookQuiz;
