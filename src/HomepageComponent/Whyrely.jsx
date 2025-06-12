import React from 'react';
import { Heart } from 'lucide-react';

const WhyRelySection = () => {
  const reasons = [
    {
      title: "We love dogs",
      description:
        "We understand that your furry friend is a treasured member of your family and deserves the best care and attention possible.",
    },
    {
      title: "Peace of mind",
      description:
        "We know that leaving your furry friend can be stressful, and you want to ensure that they are receiving the best care while you're away.",
    },
    {
      title: "Convenience",
      description: "In addition to our convenient appointment times, we also offer online booking for easy scheduling.",
    },
    {
      title: "Transparency",
      description:
        "We want you to feel confident in the care we provide and trust that we have your dog's best interests at heart.",
    },
    {
      title: "Personalized care",
      description:
        "Our team of trained professionals is dedicated to providing personalized care for every dog that comes through our doors.",
    },
    {
      title: "Teamwork",
      description:
        "Our team of vets, technicians, and other pet care professionals work together to ensure that your dog receives the best possible care.",
    },
  ]

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-[#123524]">Why rely on us?</h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {reasons.map((reason, index) => (
            <div key={index} className="flex">
              <div className="mr-4">
                <div className="w-12 h-12 flex items-center justify-center text-[#85A947]">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 14.5C7.67157 14.5 7 13.8284 7 13C7 12.1716 7.67157 11.5 8.5 11.5C9.32843 11.5 10 12.1716 10 13C10 13.8284 9.32843 14.5 8.5 14.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.5 14.5C14.6716 14.5 14 13.8284 14 13C14 12.1716 14.6716 11.5 15.5 11.5C16.3284 11.5 17 12.1716 17 13C17 13.8284 16.3284 14.5 15.5 14.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8.5 9.5C7.67157 9.5 7 8.82843 7 8C7 7.17157 7.67157 6.5 8.5 6.5C9.32843 6.5 10 7.17157 10 8C10 8.82843 9.32843 9.5 8.5 9.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.5 9.5C14.6716 9.5 14 8.82843 14 8C14 7.17157 14.6716 6.5 15.5 6.5C16.3284 6.5 17 7.17157 17 8C17 8.82843 16.3284 9.5 15.5 9.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="#3E7B27"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#123524]">{reason.title}</h3>
                <p className="text-[#3E7B27]">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyRelySection