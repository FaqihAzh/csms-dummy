'use client';

import { useState } from 'react';
import { LoginForm, SSOLogin, LoginCarousel } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginPage() {
    const [showSSO, setShowSSO] = useState(false);

    return (
        <>
            {/* Left Column - Form */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-16 lg:px-24 overflow-hidden">
                <div className="w-full max-w-md mx-auto relative min-h-[450px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {!showSSO ? (
                            <motion.div
                                key="login-form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <LoginForm onSSOClick={() => setShowSSO(true)} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sso-login"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <SSOLogin onBackClick={() => setShowSSO(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Column - Carousel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1967d2] to-[#1557b0] relative overflow-hidden">
                <LoginCarousel />
            </div>
        </>
    );
}