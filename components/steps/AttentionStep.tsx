'use client';

import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { useStep } from '../../context/StepContext';
import ModelArchitecture from '../ModelArchitecture';

export default function AttentionStep() {
  const { sentence } = useStep();
  const [selectedToken, setSelectedToken] = useState(0);
  const [showingStep, setShowingStep] = useState<'overview' | 'qkv' | 'scores' | 'output'>('overview');

  // Sample attention scores (simplified)
  const attentionScores = [
    [1.0, 0.2, 0.1, 0.1, 0.8],  // "The" attends to other tokens
    [0.2, 1.0, 0.3, 0.1, 0.1],  // "cat" attends to other tokens
    [0.1, 0.4, 1.0, 0.2, 0.1],  // "sat" attends to other tokens
    [0.1, 0.1, 0.3, 1.0, 0.2],  // "on" attends to other tokens
    [0.7, 0.1, 0.1, 0.2, 1.0],  // "the" attends to other tokens
  ];

  // Sample Q, K, V vectors for visualization
  const qkvVectors = {
    Q: [0.5, -0.3, 0.8],
    K: [0.4, 0.6, -0.2],
    V: [-0.1, 0.7, 0.3]
  };

  const getAttentionColor = (score: number) => {
    const intensity = Math.floor(score * 255);
    return `rgba(147, 51, 234, ${score})`; // Purple with varying opacity
  };

  const steps = [
    { id: 'overview', title: 'Overview', description: 'How self-attention works' },
    { id: 'qkv', title: 'Q, K, V', description: 'Query, Key, Value transformations' },
    { id: 'scores', title: 'Attention Scores', description: 'Computing attention weights' },
    { id: 'output', title: 'Output', description: 'Final attention output' }
  ];

  const analogies = [
    {
      title: "Library Analogy",
      description: "Think of attention like searching in a library. The Query (Q) is your search request, Keys (K) are book titles, and Values (V) are book contents. The attention scores show how relevant each book is to your search.",
      icon: "📚"
    },
    {
      title: "Party Conversation",
      description: "At a party, when someone speaks (Query), you focus more on some people's responses (Keys) than others, and gather information (Values) mainly from the relevant speakers.",
      icon: "🎉"
    },
    {
      title: "Spotlight Effect",
      description: "Like a spotlight operator in a theater, attention mechanism decides which parts of the input to illuminate (focus on) more brightly than others.",
      icon: "🎭"
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
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600 mb-4">
              Step 3: Self-Attention
            </h1>
            <p className="text-xl text-gray-700 content-width">
              The magic of transformers: each token learns to focus on relevant parts of the sequence,
              creating rich contextual representations.
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex gap-4 mb-8">
            {steps.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setShowingStep(step.id as any)}
                className={`p-4 rounded-xl backdrop-blur-md ${
                  showingStep === step.id
                    ? 'bg-gradient-to-r from-violet-400/20 to-purple-600/20 border-purple-300'
                    : 'bg-white/30 hover:bg-white/40'
                } shadow-lg border border-white/50 transition-all`}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold text-gray-800">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Overview Step */}
          {showingStep === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-3 gap-6">
                {analogies.map((analogy) => (
                  <motion.div
                    key={analogy.title}
                    className="p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-4xl mb-4">{analogy.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{analogy.title}</h3>
                    <p className="text-sm text-gray-600">{analogy.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-r from-violet-400/10 to-purple-600/10 border border-purple-200/30">
                <h3 className="font-bold text-gray-800 mb-4">Key Concepts</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Each token can attend to all other tokens in the sequence</li>
                  <li>Attention weights determine how much information to gather from each token</li>
                  <li>Multiple attention heads capture different types of relationships</li>
                  <li>Position-aware: tokens know where they are in the sequence</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* QKV Step */}
          {showingStep === 'qkv' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(qkvVectors).map(([name, vector]) => (
                  <motion.div
                    key={name}
                    className="p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="font-bold text-xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
                      {name === 'Q' ? 'Query' : name === 'K' ? 'Key' : 'Value'}
                      <span className="text-sm text-gray-600 ml-2">({name})</span>
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-white/50 px-2 py-1 rounded">
                          [{vector.join(', ')}]
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        {name === 'Q' ? "What I'm looking for" :
                         name === 'K' ? "What I contain" :
                         "What I contribute"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50">
                <h3 className="font-bold text-gray-800 mb-4">The Math Behind Q, K, V</h3>
                <div className="grid grid-cols-[1fr,2fr] gap-6">
                  <div>
                    <BlockMath>
                      {`Q = XW_q`}
                    </BlockMath>
                    <BlockMath>
                      {`K = XW_k`}
                    </BlockMath>
                    <BlockMath>
                      {`V = XW_v`}
                    </BlockMath>
                  </div>
                  <div className="text-gray-700 space-y-2">
                    <p>Each token's embedding (X) is transformed into three different vectors:</p>
                    <ul className="list-disc list-inside">
                      <li>Query (Q): what the token is looking for</li>
                      <li>Key (K): what the token contains</li>
                      <li>Value (V): what the token contributes</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-4">
                      <InlineMath>{`W_q`}</InlineMath>, <InlineMath>{`W_k`}</InlineMath>, and <InlineMath>{`W_v`}</InlineMath> are
                      learned weight matrices that help the model discover useful relationships.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Attention Scores Step */}
          {showingStep === 'scores' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
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

              <div className="p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50">
                <h3 className="font-bold text-gray-800 mb-4">Computing Attention Scores</h3>
                <div className="grid grid-cols-[1fr,2fr] gap-6">
                  <div>
                    <BlockMath>
                      {`Attention(Q,K,V) = softmax(\\frac{QK^T}{\\sqrt{d_k}})V`}
                    </BlockMath>
                  </div>
                  <div className="text-gray-700 space-y-2">
                    <p>The attention mechanism:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Computes compatibility scores between Q and K</li>
                      <li>Scales by <InlineMath>{`\\sqrt{d_k}`}</InlineMath> to maintain stable gradients</li>
                      <li>Applies softmax to get attention weights</li>
                      <li>Uses weights to compute weighted sum of V</li>
                    </ol>
                    <p className="text-sm text-gray-600 mt-4">
                      This allows each token to gather information from other tokens based on their relevance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Output Step */}
          {showingStep === 'output' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-r from-violet-400/10 to-purple-600/10 border border-purple-200/30">
                  <h3 className="font-bold text-gray-800 mb-4">Multi-Head Attention</h3>
                  <p className="text-gray-700 mb-4">
                    The model actually computes attention multiple times in parallel with different Q, K, V transformations.
                    This allows it to capture different types of relationships:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Syntactic relationships</li>
                    <li>Semantic relationships</li>
                    <li>Long-range dependencies</li>
                    <li>Local context patterns</li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-r from-violet-400/10 to-purple-600/10 border border-purple-200/30">
                  <h3 className="font-bold text-gray-800 mb-4">Residual Connection</h3>
                  <p className="text-gray-700 mb-4">
                    The attention output is added back to the input (residual connection) and normalized:
                  </p>
                  <BlockMath>
                    {`Output = LayerNorm(X + Attention(Q,K,V))`}
                  </BlockMath>
                  <p className="text-sm text-gray-600 mt-4">
                    This helps maintain the flow of information and makes the network easier to train.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/50">
                <h3 className="font-bold text-gray-800 mb-4">Why Self-Attention is Powerful</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/20">
                    <h4 className="font-bold text-gray-800 mb-2">All-to-All Connections</h4>
                    <p className="text-sm text-gray-600">
                      Every token can directly interact with every other token, capturing long-range dependencies.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/20">
                    <h4 className="font-bold text-gray-800 mb-2">Parallel Processing</h4>
                    <p className="text-sm text-gray-600">
                      All attention computations can be done in parallel, making it faster than RNNs.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/20">
                    <h4 className="font-bold text-gray-800 mb-2">Interpretable</h4>
                    <p className="text-sm text-gray-600">
                      Attention weights show us which tokens the model thinks are related.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}