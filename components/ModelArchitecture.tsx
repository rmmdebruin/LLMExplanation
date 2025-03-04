'use client';

import { motion } from 'framer-motion';
import { useStep } from '../context/StepContext';

const steps = [
  {
    id: 1,
    name: 'Tokenization',
    description: 'Convert text to tokens',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h12" />
      </svg>
    ),
    color: 'from-blue-400/10 to-cyan-400/10',
    activeColor: 'from-blue-400/30 to-cyan-400/30',
    bgColor: 'bg-gradient-to-br from-blue-50/30 to-cyan-50/30',
  },
  {
    id: 2,
    name: 'Embedding',
    description: 'Map tokens to vectors',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 4v16m-4-4l4 4-4-4zm-4-8l-4 4 4-4zm-4 4l-4 4 4-4z" />
      </svg>
    ),
    color: 'from-cyan-400/10 to-teal-400/10',
    activeColor: 'from-cyan-400/30 to-teal-400/30',
    bgColor: 'bg-gradient-to-br from-cyan-50/30 to-teal-50/30',
  },
  {
    id: 3,
    name: 'Self-Attention',
    description: 'Process token relationships',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v.01M12 12v.01M12 20v.01M4 12h.01M20 12h.01M7 7l.01-.01M17 7l.01-.01M7 17l.01-.01M17 17l.01-.01" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M12 5v14" opacity={0.5} />
      </svg>
    ),
    color: 'from-violet-400/10 to-purple-400/10',
    activeColor: 'from-violet-400/30 to-purple-400/30',
    bgColor: 'bg-gradient-to-br from-violet-50/30 to-purple-50/30',
  },
  {
    id: 4,
    name: 'Feed Forward',
    description: 'Process each position',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    ),
    color: 'from-fuchsia-400/10 to-pink-400/10',
    activeColor: 'from-fuchsia-400/30 to-pink-400/30',
    bgColor: 'bg-gradient-to-br from-fuchsia-50/30 to-pink-50/30',
  },
  {
    id: 5,
    name: 'Prediction',
    description: 'Generate next token',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} strokeDasharray="4 4" />
      </svg>
    ),
    color: 'from-red-400/10 to-purple-400/10',
    activeColor: 'from-red-400/30 to-purple-400/30',
    bgColor: 'bg-gradient-to-br from-red-50/30 to-purple-50/30',
  },
];

const Arrow = ({ x1, x2 }: { x1: number; x2: number }) => (
  <motion.path
    d={`M ${x1} 50 L ${x2} 50`}
    className="stroke-gray-300/30"
    strokeWidth={1.5}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />
);

export default function ModelArchitecture() {
  const { currentStep } = useStep();

  return (
    <div className="content-width mb-12">
      <div className="relative bg-white/10 rounded-b-3xl px-6 pb-6 backdrop-blur-md border-x border-b border-white/20 shadow-2xl">
        {/* Neural Network Visualization */}
        <svg
          className="w-full h-16"
          viewBox="0 0 500 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connection Lines */}
          {steps.map((_, index) => {
            if (index < steps.length - 1) {
              const x1 = 100 + index * 100;
              const x2 = x1 + 100;
              return <Arrow key={index} x1={x1} x2={x2} />;
            }
            return null;
          })}
        </svg>

        {/* Steps */}
        <div className="relative z-10 flex justify-between px-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className={`flex flex-col items-center ${
                step.id === currentStep + 1 ? 'opacity-100 scale-105' : 'opacity-60 scale-100'
              } transition-all duration-500`}
            >
              {/* Step Icon */}
              <motion.div
                className={`w-24 h-24 rounded-2xl backdrop-blur-xl shadow-xl
                  flex items-center justify-center
                  bg-gradient-to-br ${step.id === currentStep + 1 ? step.activeColor : step.color}
                  border border-white/20 transition-all duration-500
                  hover:shadow-2xl hover:border-white/30
                  transform perspective-1000 hover:-translate-y-1 hover:rotate-3`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`transform transition-transform duration-500 ${step.id === currentStep + 1 ? 'scale-110' : 'scale-100'}`}>
                  {step.icon}
                </div>
              </motion.div>

              {/* Step Label */}
              <motion.div
                className={`mt-4 text-center p-3 rounded-xl backdrop-blur-sm
                  bg-white/5 border border-white/10 shadow-lg
                  transform perspective-1000`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-semibold text-gray-800 mb-1">{step.name}</h4>
                <p className="text-sm text-gray-500/90">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}