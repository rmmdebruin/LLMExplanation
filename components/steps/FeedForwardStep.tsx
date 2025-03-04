'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function FeedForwardStep() {
  const { sentence } = useStep();
  const [activeLayer, setActiveLayer] = useState<'input' | 'hidden' | 'output'>('input');

  // Sample vectors for visualization
  const vectors = {
    input: [0.5, -0.3, 0.8],
    hidden: [1.2, 0.0, -0.7],
    output: [0.4, 0.6, 0.2]
  };

  const layerInfo = {
    input: {
      title: 'Input Layer',
      description: 'The input vector from the attention layer',
      color: 'from-blue-400 to-purple-600'
    },
    hidden: {
      title: 'Hidden Layer (with ReLU)',
      description: 'After the first linear transformation and ReLU activation',
      color: 'from-purple-400 to-pink-600'
    },
    output: {
      title: 'Output Layer',
      description: 'After the second linear transformation',
      color: 'from-pink-400 to-red-600'
    }
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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-600 mb-4">
              Step 4: Feed-Forward Network
            </h1>
            <p className="text-xl text-gray-700 content-width">
              Each position is processed independently through a two-layer neural network with ReLU activation.
            </p>
          </div>

          <div className="content-width mb-12">
            <div className="flex justify-center gap-8">
              {(Object.keys(layerInfo) as Array<keyof typeof layerInfo>).map((layer) => (
                <motion.div
                  key={layer}
                  className={`p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50 cursor-pointer
                    ${activeLayer === layer ? 'ring-2 ring-purple-500' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveLayer(layer)}
                >
                  <h3 className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${layerInfo[layer].color}`}>
                    {layerInfo[layer].title}
                  </h3>
                  <div className="mt-4 p-2 rounded-lg bg-white/20">
                    <code className="text-sm">
                      [{vectors[layer].join(', ')}]
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block mb-8"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-600 mb-4">The Math Behind It</h3>
            <div className="mb-4">
              <BlockMath>
                {`FFN(x) = max(0, xW_1 + b_1)W_2 + b_2`}
              </BlockMath>
            </div>
            <p className="text-gray-700">
              The feed-forward network applies two linear transformations with a ReLU activation in between.
              This allows the model to process each position's information independently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="content-width content-block"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-600 mb-4">Interactive Visualization</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                {activeLayer === 'input' && 'This is the input vector from the attention layer. Each number represents different aspects of the token\'s meaning.'}
                {activeLayer === 'hidden' && 'After the first transformation, negative values are set to 0 by the ReLU function, creating a new representation.'}
                {activeLayer === 'output' && 'The final transformation produces the output vector, which will be added back to the original input (residual connection).'}
              </p>
              <div className="h-4 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}