'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface StepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  sentence: string[];
  targetWord: string;
  completeSentence: string;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const sentence = ["The", "cat", "sat", "on", "the"];
  const targetWord = "mat";
  const completeSentence = "The cat sat on the mat";
  const totalSteps = 5;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <StepContext.Provider value={{
      currentStep,
      setCurrentStep,
      sentence,
      targetWord,
      completeSentence,
      totalSteps,
      nextStep,
      prevStep
    }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
}