import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", phone: "", comment: "" });
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-[#EFE3C2] bg-opacity-20 rounded-xl md:rounded-3xl">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-[#123524]">
            <span className="relative inline-block">
              Have a 
              <span className="absolute -top-4 right-0 text-[#85A947] text-2xl">🐾</span>
            </span>
            <br />
            question or 
            <br />
            <span className="relative">
              comment?
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,5 Q25,10 50,5 T100,5" stroke="#85A947" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#3E7B27] mb-4">
            We'd love to hear from you! Fill out the form and our team will get back to you as soon as possible.
          </p>

          <div className="mt-4 md:mt-8 relative">
            <div className="absolute right-0 bottom-0 transform scale-75 md:scale-100">
              <svg width="100" height="60" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,10 Q60,5 110,70" stroke="#3E7B27" strokeWidth="6" fill="none" />
                <path d="M90,60 L110,70 L100,40" stroke="#3E7B27" strokeWidth="6" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Decorative background elements - smaller */}
          <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#85A947] rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-[#85A947] rounded-full opacity-20"></div>
          
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 md:p-6 rounded-xl shadow-md">
            <div>
              <div className="relative">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-3 pl-10 text-base rounded-full border-2 border-[#3E7B27] focus:outline-none focus:ring-2 focus:ring-[#85A947]"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-[#85A947]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full p-3 pl-10 text-base rounded-full border-2 border-[#3E7B27] focus:outline-none focus:ring-2 focus:ring-[#85A947]"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-[#85A947]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone"
                  className="w-full p-3 pl-10 text-base rounded-full border-2 border-[#3E7B27] focus:outline-none focus:ring-2 focus:ring-[#85A947]"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-[#85A947]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Your Comment"
                  className="w-full p-3 pl-10 text-base rounded-2xl border-2 border-[#3E7B27] focus:outline-none focus:ring-2 focus:ring-[#85A947] min-h-[100px] md:min-h-[120px]"
                  required
                />
                <div className="absolute left-3 top-6">
                  <svg className="w-4 h-4 text-[#85A947]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 md:py-4 text-base md:text-lg font-semibold bg-[#123524] hover:bg-[#3E7B27] text-white rounded-full transition-colors duration-300 shadow-md flex items-center justify-center"
            >
              <span>Send Message</span>
              <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;