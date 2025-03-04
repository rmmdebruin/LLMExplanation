'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function EmbeddingStep() {
  const { sentence } = useStep();

  // Sample embedding vectors (simplified for visualization)
  const embeddings = [
    [0.2, -0.5, 0.8],
    [-0.3, 0.7, 0.1],
    [0.6, 0.4, -0.2],
    [-0.1, -0.3, 0.9],
    [0.2, -0.5, 0.8]
  ];

  const positionVectors = [
    [0.1, 0.1, 0.1],
    [0.2, 0.2, 0.2],
    [0.3, 0.3, 0.3],
    [0.4, 0.4, 0.4],
    [0.5, 0.5, 0.5]
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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Step 2: Token & Positional Embeddings
            </h1>
            <p className="text-xl text-gray-700 content-width">
              Each token is converted into a high-dimensional vector, and combined with position information.
            </p>
          </div>

          <div className="content-width grid grid-cols-5 gap-4 mb-12">
            {sentence.map((token, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50"
              >
                <div className="text-center mb-3">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    {token}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-1">Token Embedding:</h3>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400/10 to-purple-400/10">
                      <code className="text-xs">
                        [{embeddings[index].join(', ')}]
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-1">Position Vector:</h3>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400/10 to-pink-400/10">
                      <code className="text-xs">
                        [{positionVectors[index].join(', ')}]
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-1">Combined:</h3>
                    <div className="p-2 rounded-lg bg-gradient-to-r from-pink-400/10 to-red-400/10">
                      <code className="text-xs">
                        [{embeddings[index].map((e, i) => (e + positionVectors[index][i]).toFixed(2)).join(', ')}]
                      </code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block mb-8"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              The Math Behind It
            </h3>
            <div className="mb-4">
              <BlockMath>
                {`E_{final} = E_{token} + E_{position}`}
              </BlockMath>
            </div>
            <p className="text-gray-700">
              The final embedding is the sum of the token embedding and the positional embedding.
              This allows the model to understand both the meaning of words and their position in the sequence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Interactive Insight
            </h3>
            <p className="text-gray-700">
              Notice how similar words (like the two "the" tokens) have identical token embeddings,
              but different position vectors make their final representations unique!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}