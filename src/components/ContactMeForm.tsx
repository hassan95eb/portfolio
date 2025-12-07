"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function ContactMeForm() {
  const [state, handleSubmit] = useForm("mnnebave");

  React.useEffect(() => {
    if (state.succeeded) {
      confetti({
        particleCount: 130,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      });
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 max-w-md w-full mx-6 overflow-hidden border border-gray-200 dark:border-gray-800"
          >
            <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-blue-500/10 to-emerald-500/10" />

            <div className="relative z-10 text-center">
              <motion.svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <motion.path
                  d="M20 50 L40 70 L80 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.svg>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-bold text-primary-text mb-3"
              ></motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-lg text-muted-foreground mb-8"
              ></motion.p>

              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-action text-white rounded-full font-medium hover:shadow-xl transition pointer-events-auto"
              >
                Thank you for getting in touch! I&apos;ll reply to you within
                the next 24 hours.
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-primary-text"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-lg border border-secondary bg-background text-primary-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all"
          placeholder="Your name"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-primary-text"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-secondary bg-background text-primary-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all"
          placeholder="your.email@example.com"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-600 text-sm mt-1"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-primary-text"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-secondary bg-background text-primary-text placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all resize-none"
          placeholder="Your message here..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-600 text-sm mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full md:w-auto px-8 py-3 bg-action text-white font-medium rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-action focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
      >
        {state.submitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
