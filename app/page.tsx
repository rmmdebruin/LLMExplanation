'use client';

import { AnimatePresence, motion } from 'framer-motion';
import StepNavigation from '../components/StepNavigation';
import AttentionStep from '../components/steps/AttentionStep';
import EmbeddingStep from '../components/steps/EmbeddingStep';
import FeedForwardStep from '../components/steps/FeedForwardStep';
import PredictionStep from '../components/steps/PredictionStep';
import TokenizationStep from '../components/steps/TokenizationStep';
import { StepProvider, useStep } from '../context/StepContext';

const stepComponents = {
  0: TokenizationStep,
  1: EmbeddingStep,
  2: AttentionStep,
  3: FeedForwardStep,
  4: PredictionStep,
};

function StepContent() {
  const { currentStep } = useStep();
  const CurrentStepComponent = stepComponents[currentStep as keyof typeof stepComponents];

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <CurrentStepComponent />
        </motion.div>
      </AnimatePresence>
      <StepNavigation />
    </div>
  );
}

export default function Home() {
  return (
    <StepProvider>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 overflow-hidden">
        <StepContent />
      </main>
    </StepProvider>
  );
}