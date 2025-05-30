import React from 'react';

interface SectionProps {
  title: string;
  description: string;
  background?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, background, children }) => {
  return (
    <section className={`py-8 sm:py-16 text-center ${background || 'bg-white'}`}>
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 mx-4">{description}</p>
      {children}
    </section>
  );
};

export default Section;