'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function PredictionStep() {
  const { sentence, targetWord } = useStep();
  const [currentMathStep, setCurrentMathStep] = useState(0);

  // Sample top predictions with probabilities
  const predictions = [
    { token: 'mat', probability: 0.85, correct: true },
    { token: 'floor', probability: 0.08, correct: false },
    { token: 'rug', probability: 0.05, correct: false },
    { token: 'carpet', probability: 0.02, correct: false }
  ];

  const mathSteps = [
    {
      formula: `P(next\\_token) = softmax(LayerNorm(x)W_{vocab})`,
      description: 'Final probability distribution',
      step: 1
    },
    {
      formula: `softmax(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}`,
      description: 'Converts logits to probabilities',
      step: 2
    },
    {
      formula: `LayerNorm(x) = \\gamma \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta`,
      description: 'Normalizes hidden states',
      step: 3
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <ModelArchitecture />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="content-width"
      >
        <div className="flex flex-col items-center full-width">
          <div className="text-center mb-12 full-width">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600 mb-4">
              Step 5: Final Prediction
            </h1>
            <p className="text-xl text-gray-700 content-width">
              The model predicts the next token "mat" by transforming the final representations into vocabulary probabilities.
            </p>
          </div>

          <div className="content-width mb-12">
            <div className="flex justify-center items-center gap-4 mb-8">
              {sentence.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50"
                >
                  <span className="text-xl font-bold text-gray-800">{token}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-r from-purple-400 to-pink-600 shadow-lg border border-white/50"
              >
                <span className="text-xl font-bold text-white">{targetWord}</span>
              </motion.div>
            </div>

            <div className="narrow-width max-w-[50%] mx-auto">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600 mb-4 text-center">Top Predictions</h3>
              {predictions.map((pred, index) => (
                <motion.div
                  key={pred.token}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`p-4 rounded-xl backdrop-blur-md ${
                    pred.correct
                      ? 'bg-gradient-to-r from-green-400/20 to-emerald-400/20 border-green-200'
                      : 'bg-white/30'
                  } shadow-lg border border-white/50 flex justify-between items-center w-full`}
                >
                  <div className="flex items-center w-full">
                    <span className="font-bold text-gray-800 w-[72px]">{pred.token}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pred.probability * 100}%` }}
                          transition={{ duration: 1, delay: 1 + index * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-red-400 to-purple-600"
                        />
                      </div>
                      <span className="text-sm font-mono text-gray-600 w-16">
                        {(pred.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="content-width content-block mb-8"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600 mb-6 flex items-center gap-2">
              The Math Behind It
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10h-6m-3-3h12M9 17l3-10 3 10" />
              </svg>
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentMathStep((prev) => Math.max(0, prev - 1))}
                  className={`p-2 rounded-lg ${currentMathStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600 hover:bg-purple-100'}`}
                  disabled={currentMathStep === 0}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-600">
                  Step {currentMathStep + 1} of {mathSteps.length}
                </span>
                <button
                  onClick={() => setCurrentMathStep((prev) => Math.min(mathSteps.length - 1, prev + 1))}
                  className={`p-2 rounded-lg ${currentMathStep === mathSteps.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-purple-600 hover:bg-purple-100'}`}
                  disabled={currentMathStep === mathSteps.length - 1}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <motion.div
                key={currentMathStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-[1fr,auto] gap-6 items-center"
              >
                <div className="p-4 rounded-lg backdrop-blur-md bg-white/40 shadow-inner border border-white/60">
                  <BlockMath>
                    {mathSteps[currentMathStep].formula}
                  </BlockMath>
                </div>
                <div className="text-sm text-gray-600 italic flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-purple-600 text-white flex items-center justify-center text-sm font-bold">
                    {mathSteps[currentMathStep].step}
                  </span>
                  {mathSteps[currentMathStep].description}
                </div>
              </motion.div>

              <div className="flex justify-center gap-2 mt-4">
                {mathSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMathStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentMathStep === index
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-4'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-6 p-4 rounded-lg bg-gradient-to-r from-red-400/10 to-purple-600/10 border border-purple-200/30"
            >
              <p className="text-gray-700">
                The model transforms the final hidden states through layer normalization and a vocabulary projection matrix,
                then applies softmax to get probabilities that sum to 1. The token with the highest probability becomes the prediction.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="content-width content-block"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600 mb-4">
              Why "mat"?
            </h3>
            <p className="text-gray-700">
              The model predicts "mat" because it has learned common patterns in English text.
              The phrase "The cat sat on the ___" is likely to be completed with a surface that a cat might sit on,
              and "mat" is a common and contextually appropriate choice!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}