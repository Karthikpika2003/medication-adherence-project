import { motion, AnimatePresence } from "framer-motion";
import SignupForm from "./SignupForm";

export default function SignupModal({ show, onClose, onSignup }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-4 right-4">✕</button>
            <SignupForm onSignup={onSignup} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
