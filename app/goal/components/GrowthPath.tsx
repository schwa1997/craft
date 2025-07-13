"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  current?: boolean;
  struggle?: string;
}

interface GrowthPathProps {
  timeline: TimelineItem[];
}

export function GrowthPath({ timeline }: GrowthPathProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="mb-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
      >
        <h2 className="text-xl font-semibold text-teal-800">Your Growth Path</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex">
              {/* Timeline line */}
              <div className="relative mr-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-teal-200 transform -translate-x-1/2"></div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="relative"
                    >
                      <div
                        className={`absolute -left-11 top-0 w-4 h-4 ${
                          item.current
                            ? "bg-teal-600 border-teal-200"
                            : "bg-teal-400 border-green-100"
                        } rounded-full border-4`}
                      ></div>
                      <div
                        className={`p-4 ${
                          item.current ? "bg-teal-50" : "bg-white"
                        } rounded-xl shadow-sm border ${
                          item.current ? "border-teal-200" : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <span
                            className={`text-xs ${
                              item.current ? "text-teal-700" : "text-gray-500"
                            }`}
                          >
                            {item.date}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            item.current ? "text-teal-700" : "text-gray-600"
                          } mt-1`}
                        >
                          <ReactMarkdown
                            components={{
                              p: ({ node, ...props }) => <div {...props} />,
                            }}
                          >
                            {item.description}
                          </ReactMarkdown>
                        </div>
                        {item.struggle && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
                          >
                            <p className="text-sm text-amber-800">
                              {item.struggle}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}