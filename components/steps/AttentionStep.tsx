'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function AttentionStep() {
  const { sentence } = useStep();
  const [selectedToken, setSelectedToken] = useState(0);

  // Sample attention scores (simplified)
  const attentionScores = [
    [1.0, 0.2, 0.1, 0.1, 0.8],  // "The" attends to other tokens
    [0.2, 1.0, 0.3, 0.1, 0.1],  // "cat" attends to other tokens
    [0.1, 0.4, 1.0, 0.2, 0.1],  // "sat" attends to other tokens
    [0.1, 0.1, 0.3, 1.0, 0.2],  // "on" attends to other tokens
    [0.7, 0.1, 0.1, 0.2, 1.0],  // "the" attends to other tokens
  ];

  const getAttentionColor = (score: number) => {
    const intensity = Math.floor(score * 255);
    return `rgba(147, 51, 234, ${score})`; // Purple with varying opacity
  };

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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600 mb-4">
              Step 3: Self-Attention
            </h1>
            <p className="text-xl text-gray-700 content-width">
              Each token learns to focus on relevant parts of the input sequence.
            </p>
          </div>

          <div className="content-width mb-12">
            <div className="flex justify-center gap-4 mb-8">
              {sentence.map((token, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50 cursor-pointer
                    ${selectedToken === index ? 'ring-2 ring-purple-500' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedToken(index)}
                >
                  <span className="text-xl font-bold text-gray-800">{token}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-5 gap-4">
                {sentence.map((token, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl text-center"
                    style={{
                      backgroundColor: getAttentionColor(attentionScores[selectedToken][index]),
                      transform: `scale(${0.8 + attentionScores[selectedToken][index] * 0.4})`
                    }}
                  >
                    <span className="text-white font-bold">{token}</span>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Attention Scores</h3>
                <div className="grid grid-cols-5 gap-2">
                  {attentionScores[selectedToken].map((score, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-sm font-mono">{score.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block mb-8"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600 mb-4">
              The Math Behind It
            </h3>
            <div className="mb-4">
              <BlockMath>
                {`Attention(Q, K, V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V`}
              </BlockMath>
            </div>
            <p className="text-gray-700">
              The attention mechanism computes how much each token should focus on other tokens.
              It uses queries (Q), keys (K), and values (V) to create weighted combinations of the input.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600 mb-4">
              Did You Notice?
            </h3>
            <p className="text-gray-700">
              Words often pay more attention to semantically related words. For example, articles like "the"
              tend to attend strongly to the nouns they modify!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}