'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-ieee-blue-100 z-50 rounded-xl shadow-xl max-w-2xl w-full p-10 text-center"
      >
        {/* Title */}
        <h1 className="text-6xl font-bold mb-4 text-ieee-blue-100">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-ieee-blue-40 mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Return to the homepage to continue.
        </p>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ieee-blue-100 hover:bg-ieee-blue-90 text-white font-semibold shadow-md"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </motion.button>

        {/* Footer */}
        <p className="mt-8 text-ieee-blue-40 text-sm">
          IEEE Helwan Student Branch
        </p>
      </motion.div>
    </div>
  );
}
