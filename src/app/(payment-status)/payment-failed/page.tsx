//payment-failed/page.tsx
"use client";

import { motion } from "framer-motion";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-8 text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 12,
                    }}
                    className="flex justify-center mb-6"
                >
                    <XCircle className="w-24 h-24 text-red-500" />
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-3">
                    Payment Failed
                </h1>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                    Unfortunately, your payment could not be completed.
                    Please try again or use another payment method.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-4">
                    <Link href="competition-registeration">
                        <Button className="w-full bg-ieee-blue-100 hover:bg-ieee-blue-100/80 text-white cursor-pointer">
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button
                            variant="outline"
                            className="w-full cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back To Home
                        </Button>
                    </Link>
                </div>

                {/* Extra note */}
                <p className="text-xs text-muted-foreground mt-6">
                    If the problem continues, please contact support.
                </p>
            </motion.div>
        </div>
    );
}