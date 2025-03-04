'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function TokenizationStep() {
  const { sentence, targetWord } = useStep();
  const [hoveredToken, setHoveredToken] = useState<number | null>(null);

  const tokenColors = [
    'from-red-400 to-red-600',
    'from-orange-400 to-orange-600',
    'from-yellow-400 to-yellow-600',
    'from-green-400 to-green-600',
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600'
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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Step 1: Tokenization
            </h1>
            <p className="text-xl text-gray-700 content-width">
              GPT-2 breaks down the input text into tokens. Each token represents a common word or subword unit.
              We'll predict the next token after "The cat sat on the".
            </p>
          </div>

          <div className="content-width flex flex-wrap justify-center gap-4 mb-8">
            {sentence.map((token, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl backdrop-blur-md bg-gradient-to-r ${tokenColors[index]}
                  shadow-lg border border-white/50 cursor-pointer transform transition-all`}
                whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
                onHoverStart={() => setHoveredToken(index)}
                onHoverEnd={() => setHoveredToken(null)}
              >
                <span className="text-white text-2xl font-bold">{token}</span>
              </motion.div>
            ))}
            <motion.div
              className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-r from-pink-400 to-pink-600
                shadow-lg border border-white/50 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
            >
              <span className="text-white text-2xl font-bold">?</span>
            </motion.div>
          </div>

          {hoveredToken !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="content-width content-block"
            >
              <p className="text-gray-800">
                Token ID: <span className="font-mono">{hoveredToken + 1}</span> |
                Position: <span className="font-mono">{hoveredToken}</span>
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Did you know?
            </h3>
            <p className="text-gray-700">
              GPT-2 uses Byte Pair Encoding (BPE) for tokenization. This means it can handle any text by breaking
              unknown words into smaller subword units. For example, "unhappy" might be split into "un" and "happy"!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}