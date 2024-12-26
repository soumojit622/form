import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Formy.ai? 🤖",
      answer:
        "Formy.ai is an AI-powered form builder that allows you to create and share stunning forms in seconds, effortlessly. 📝✨",
    },
    {
      question: "How does the AI help in form building? 🤖💡",
      answer:
        "The AI analyzes your input and recommends the best field types, validations, and even generates the form layout for you, saving time and effort. ⏱️🔧",
    },
    {
      question: "Is there any subscription cost? 💰",
      answer:
        "We offer both free and premium plans. The free plan includes basic features, while the premium plan unlocks advanced AI capabilities and custom styling. 💎🎨",
    },
    {
      question: "Can I embed the forms anywhere? 🌍",
      answer:
        "Yes, once you create your form, you can easily embed it on websites, blogs, or share it via a direct link. 🔗🌐",
    },
    {
      question: "How secure is my data? 🔒",
      answer:
        "Formy.ai prioritizes security. We use industry-standard encryption protocols to ensure your data is safe and private. 🔐🛡️",
    },
  ];

  return (
    <div className="w-full py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-extrabold text-center text-violet-800 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
            >
              <div
                className="cursor-pointer flex justify-between items-center py-5 px-6 text-xl font-semibold text-gray-800 hover:bg-purple-100 transition-all duration-300"
                onClick={() => toggleAnswer(index)}
              >
                <span>{item.question}</span>
                <span>
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div
                className={`${
                  activeIndex === index ? "max-h-full" : "max-h-0"
                } overflow-hidden transition-all duration-500 ease-in-out`}
              >
                <div className="px-6 py-4 text-gray-700 text-lg leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
