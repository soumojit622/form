import { useState, useEffect } from "react";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      title: "CEO, Tech Innovators Pvt Ltd",
      text: "Formy.ai has revolutionized the way we create forms. It's extremely intuitive and has saved us significant time and effort. Highly recommend it for any business looking to streamline their form-building process!",
      image: "/images/male.png", 
    },
    {
      name: "Priya Sharma",
      title: "Marketing Manager, Bright Ideas Marketing",
      text: "The AI-powered suggestions are spot on! Formy.ai has made our form creation process a breeze, and the user interface is very easy to navigate. A game-changer for our marketing campaigns.",
      image: "/images/female.png", 
    },
    {
      name: "Arun Verma",
      title: "Developer, CodeCraft Solutions",
      text: "I’ve tried various form-building tools, but Formy.ai stands out with its seamless integration and powerful features. It’s perfect for developers and businesses alike.",
      image: "/images/male.png", 
    },
    {
      name: "Sanya Gupta",
      title: "Designer, Creative Designs Studio",
      text: "The customization options offered by Formy.ai are fantastic. It allowed me to design the exact forms I needed without any hassle. It's truly made my job easier!",
      image: "/images/female.png", 
    },
    {
      name: "Ravi Patel",
      title: "Founder, Digital Visionary Solutions",
      text: "Formy.ai has been a game-changer for our business. Its flexibility and ease of use have saved our team hours in form creation. I recommend it to anyone who wants to streamline their workflow.",
      image: "/images/male.png", 
    },
    {
      name: "Aarti Joshi",
      title: "Product Manager, Innovate Tech",
      text: "The user-friendly interface and smart AI-driven features of Formy.ai have greatly improved our process. It's a must-have tool for anyone looking to create professional forms effortlessly.",
      image: "/images/female.png", 
    },
    {
      name: "Vikas Rao",
      title: "CTO, FutureTech Solutions",
      text: "I’ve been using Formy.ai for months, and I am impressed by its ability to quickly adapt to our needs. It’s made the form creation process so much more efficient, and the results are fantastic.",
      image: "/images/male.png", 
    },
    {
      name: "Neha Agarwal",
      title: "UX/UI Designer, Creative Studio",
      text: "Formy.ai offers unparalleled customization options, making it easy to create forms that meet all our design requirements. It's a fantastic tool for anyone in the creative field.",
      image: "/images/female.png", 
    },
    {
      name: "Siddharth Mehra",
      title: "Software Engineer, CodeBase Technologies",
      text: "Formy.ai has made it incredibly easy to integrate complex forms into our applications. It's a powerful tool that is both flexible and reliable for developers like me.",
      image: "/images/male.png", 
    },
    {
      name: "Komal Singh",
      title: "Marketing Head, Fresh Ideas Group",
      text: "Formy.ai has been a fantastic asset for our team. The AI-powered suggestions are incredibly accurate, and the interface is simple and clean. It has definitely increased our productivity.",
      image: "/images/female.png", 
    },
  ];
  

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full py-16 bg-gradient-to-r from-indigo-100 via-indigo-200 to-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <h2 className="text-4xl font-extrabold text-center text-violet-800 mb-10">
          What Our Indian Clients Are Saying
        </h2>
        <div className="overflow-hidden relative">
          <div
            className="flex transition-all duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full px-6">
                <div className="bg-white p-8 rounded-lg hover:shadow-3xl transform transition-all duration-500 ease-in-out hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-lg text-gray-700">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
