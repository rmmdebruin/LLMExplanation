'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { useState } from 'react';
import { BlockMath } from 'react-katex';

interface SectionProps {
  title: string;
  description: string;
  formula?: string;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  index: number;
}

export default function Section({ title, description, formula, tableData, index }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="mb-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="text-2xl font-bold text-primary-700">{title}</h2>
        <ChevronDownIcon
          className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      <p className="mt-4 text-gray-600">{description}</p>

      {formula && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md overflow-x-auto">
          <BlockMath>{formula}</BlockMath>
        </div>
      )}

      {isExpanded && tableData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 overflow-x-auto"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableData.headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}