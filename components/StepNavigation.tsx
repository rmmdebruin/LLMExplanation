'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useStep } from '../context/StepContext';

export default function StepNavigation() {
  const { currentStep, setCurrentStep, totalSteps, nextStep, prevStep } = useStep();

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevStep}
        disabled={currentStep === 0}
        className={`p-4 rounded-full backdrop-blur-md bg-white/30 shadow-lg border border-white/50
          ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/40'}`}
      >
        <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
      </motion.button>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentStep
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextStep}
        disabled={currentStep === totalSteps - 1}
        className={`p-4 rounded-full backdrop-blur-md bg-white/30 shadow-lg border border-white/50
          ${currentStep === totalSteps - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/40'}`}
      >
        <ArrowRightIcon className="w-6 h-6 text-gray-800" />
      </motion.button>
    </div>
  );
}