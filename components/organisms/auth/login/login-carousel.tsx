'use client';

import { useState, useEffect } from 'react';
import { Typography } from '@/components';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const IMG_W = 1920;
const IMG_H = 1080;

const OBJ_POS = [
    'center',
    'left center',
    'center top',
    'center',
];

const slides = [
    {
        src: '/images/slide1-pln.png',
        title: 'Alur Tahapan CSMS',
        subtitle: 'RSA • Pre-Qualification  • Selection  • Pre-Job  • WIP  • Final Evaluation',
        description:
            'Contractor Safety Management System – terintegrasi end-to-end untuk keselamatan kerja tertinggi.',
    },
    {
        src: '/images/slide3-pln.png',
        title: 'Aspirasi PLN 2024',
        subtitle: 'MENJADI PERUSAHAAN LISTRIK TERKEMUKA DI ASEAN',
        description:
            'Green, Innovative, Lean, Customer Focused – mendukung transisi energi menuju 100 % terbarukan.',
    },
    {
        src: '/images/slide2-pln.png',
        title: 'Our Value',
        subtitle: 'HARMONIS • LOYAL • KOMPETEN • ADAPTIF • INOVATIF • KOLABORATIF • AMANAH',
        description:
            'Nilai-nilai dasar yang menjadi pegangan setap insan PLN dalam melayani bangsa.',
    },
    {
        src: '/images/slide4-pln.png',
        title: 'Listrik untuk Kehidupan yang Lebih Baik',
        subtitle: 'PROGRES PROGRAM 35.000 MW',
        description:
            'Program nasional PLN memastikan seluruh wilayah Indonesia merasakan listrik yang andal dan terjangkau.',
    },
];

export function LoginCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            transition={{ duration: 8, ease: 'linear' }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={slides[current].src}
                                alt={slides[current].title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                style={{ objectPosition: OBJ_POS[current] }}
                                priority
                            />
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#004a99] via-[#004a99]/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-6 px-8 mt-auto pb-24">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="space-y-4"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2">
                            <Typography
                                variant="smallText"
                                className="text-white font-bold tracking-[0.15em] uppercase text-[11px]"
                            >
                                {slides[current].subtitle}
                            </Typography>
                        </div>

                        <Typography
                            variant="h1"
                            className="text-white border-b-0 pb-0 drop-shadow-lg text-3xl md:text-4xl lg:text-5xl font-extrabold"
                        >
                            {slides[current].title}
                        </Typography>

                        <Typography
                            variant="lead"
                            className="text-white/90 max-w-2xl mx-auto drop-shadow-md text-base md:text-lg leading-relaxed"
                        >
                            {slides[current].description}
                        </Typography>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-3 pt-6">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === current
                                ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                                : 'w-1.5 bg-white/40 hover:bg-white/60'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#004a99]/80 to-transparent pointer-events-none" />
        </div>
    );
}