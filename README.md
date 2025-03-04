# GPT-2 Architecture Explorer

An interactive web application that guides users through the GPT-2 model architecture, providing detailed explanations, mathematical formulas, and sample data for each component.
Website is hosted at: https://llm-explanation.vercel.app/

## Features

- 🎯 Step-by-step exploration of GPT-2's architecture
- 📊 Interactive tables with sample data for each component
- ⚡ Smooth animations and transitions
- 📐 LaTeX-rendered mathematical formulas
- 📱 Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gpt2-architecture-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Architecture Overview

The application walks through the following components of GPT-2:

1. **Token & Positional Embeddings**
   - Token to vector conversion
   - Positional encoding addition

2. **Multi-Head Self-Attention**
   - Query, Key, Value transformations
   - Attention score calculation
   - Multiple attention heads

3. **Layer Normalization & Residual Connections**
   - Normalization process
   - Skip connections

4. **Feed-Forward Network**
   - Two linear transformations
   - ReLU activation

5. **Final Layer & Output**
   - Final normalization
   - Vocabulary projection
   - Softmax probability distribution

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- KaTeX
- Hero Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
