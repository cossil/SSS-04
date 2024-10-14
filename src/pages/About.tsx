import React from 'react';
import { Users, Award, Leaf } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About South Side Sun</h1>
          <p className="text-xl">Your local experts in solar energy solutions</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="mb-4">At South Side Sun, we're committed to empowering homes, small businesses, and rural properties in Florida with sustainable and cost-effective solar energy solutions. Our mission is to make clean energy accessible, understandable, and beneficial for everyone in our community.</p>
              <p>We believe in personalized service, technical excellence, and long-term partnerships with our clients. Our goal is not just to install solar panels, but to create energy independence and contribute to a greener future for Gainesville and beyond.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4">Founded by a veteran electrical engineer with over 30 years of experience, South Side Sun was born out of a passion for renewable energy and a desire to serve our local community. We saw a need for honest, expert solar consulting that prioritizes the customer's needs over aggressive sales tactics.</p>
              <p>Since our inception, we've been dedicated to educating and guiding our neighbors through the solar energy transition, ensuring they make informed decisions that benefit them in the long run.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
    </div>
  );
};

export default About;