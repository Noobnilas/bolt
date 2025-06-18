import React from 'react';
import { Target, Users, Award, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision Engineering',
      description: 'Every SYMORA product is meticulously designed using advanced biomechanical principles.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build our products based on real feedback from wellness professionals and users.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Premium materials and rigorous testing ensure lasting performance and reliability.'
    },
    {
      icon: Heart,
      title: 'Wellness Focus',
      description: 'Your health and comfort are at the center of everything we create.'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About SYMORA</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how people approach posture, recovery, and overall wellness 
            through precision-engineered solutions that fit seamlessly into modern life.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                SYMORA was born from a simple observation: despite our increasingly connected world, 
                we're more disconnected from our bodies than ever before. Hours spent hunched over 
                devices have created a silent epidemic of poor posture and chronic pain.
              </p>
              <p>
                Our team of wellness experts, engineers, and designers came together with a shared 
                vision: to create beautiful, effective tools that help people reclaim their posture 
                and enhance their daily well-being.
              </p>
              <p>
                Today, SYMORA continues to innovate at the intersection of science, design, and 
                wellness, helping thousands of people stand taller and feel better every day.
              </p>
            </div>
          </div>

          <div className="animate-fadeInUp animation-delay-300">
            <img
              src="https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="SYMORA products"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do at SYMORA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors duration-200 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center bg-gray-50 rounded-2xl p-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To empower individuals to achieve optimal posture and wellness through innovative, 
            science-backed products that seamlessly integrate into their daily lives, helping 
            them stand taller, feel better, and live with greater confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;