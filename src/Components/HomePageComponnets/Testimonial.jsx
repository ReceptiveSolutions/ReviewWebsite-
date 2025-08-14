import React from 'react';


function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      quote: "This review platform helped me find the best restaurants in town. The ratings are spot-on!",
      author: "Sarah K.",
      role: "Food Enthusiast",
      rating: 5,
      avatar: "🍕",
      company: "Gourmet Explorer"
    },
    {
      id: 2,
      quote: "I never book a hotel without checking reviews here first. Saved me from several bad experiences!",
      author: "Michael T.",
      role: "Frequent Traveler",
      rating: 4.5,
      avatar: "✈️",
      company: "Global Ventures"
    },
    {
      id: 3,
      quote: "As a small business owner, the authentic feedback has helped us improve our services dramatically.",
      author: "Priya M.",
      role: "Business Owner",
      rating: 5,
      avatar: "💼",
      company: "Urban Cafe"
    },
    {
      id: 4,
      quote: "The platform's honest reviews have transformed how we approach customer service in our chain.",
      author: "David L.",
      role: "Regional Manager",
      rating: 4,
      avatar: "🏨",
      company: "Comfort Suites"
    },
    {
      id: 5,
      quote: "Our sales increased by 30% after responding to feedback we received here.",
      author: "Maria G.",
      role: "Marketing Director",
      rating: 5,
      avatar: "📈",
      company: "TechSolutions"
    },
    {
      id: 6,
      quote: "As a new user, I'm impressed by the quality and depth of reviews available.",
      author: "James P.",
      role: "Product Tester",
      rating: 4.5,
      avatar: "🔍",
      company: "Quality Insights"
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= rating ? 'text-amber-400' : (star - 0.5 <= rating ? 'text-amber-300' : 'text-amber-200')}`}
          >
            {star <= rating ? '★' : (star - 0.5 <= rating ? '½' : '☆')}
          </span>
        ))}
      </div>
    );
  };

  return (
    
    <div className="bg-gradient-to-b from-amber-50 to-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">What Our Community Says</h2>
        <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
        <p className="text-lg text-amber-700">
          Don't just take our word for it - hear from our valued members
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">{testimonial.avatar}</div>
              <div>
                <h4 className="font-semibold text-amber-900">{testimonial.author}</h4>
                <p className="text-sm text-amber-600">{testimonial.role}</p>
              </div>
            </div>
            
            {renderStars(testimonial.rating)}
            
            <blockquote className="mt-4 text-amber-800 italic">
              "{testimonial.quote}"
            </blockquote>

            <div className="mt-4 pt-4 border-t border-amber-100">
              <p className="text-sm font-medium text-amber-700">{testimonial.company}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors">
          Join Our Community
          <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TestimonialSection;