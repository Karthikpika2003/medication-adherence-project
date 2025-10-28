import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal content */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md bg-white rounded-xl shadow-lg p-6 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={onClose}
            >
              ×
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
