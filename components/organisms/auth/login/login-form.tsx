'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Slash, Shield } from 'lucide-react';
import { Button, Input, PrivacyFAQModal, Typography, privacyPolicyData } from '@/components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib';
import { useMediaQuery } from '@/hooks';
import { faqData } from '../../privacy-faq/privacy-faq-data';
interface LoginFormProps {
    onSSOClick: () => void;
}

export function LoginForm({ onSSOClick }: LoginFormProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false);
    const [isOpenFAQ, setIsOpenFAQ] = useState(false);

    const isMobile = useMediaQuery('(max-width: 768px)');

    const handleChange = (field: 'username' | 'password') => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { username: '', password: '' };
        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <>
            <div className='space-y-12 lg:space-y-3'>
                <div className="flex items-center">
                    <Image src="/images/Logo_PLN-horizontal.png" alt="Logo" width={110} height={40} />
                </div>

                <div className='lg:mt-8 lg:mb-4'>
                    <Typography variant="h3" className="text-[#202124] leading-none -mb-3">
                        Sign In
                    </Typography>
                    <Typography variant="p" className="text-[#5f6368] text-sm leading-6 -mt-4">
                        Welcome back! Please enter your credentials to access the Contractor Safety Management System.
                    </Typography>
                </div>

                <div className="space-y-6 lg:space-y-3">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-5">
                            <Input
                                label="Username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange('username')}
                                error={errors.username}
                                leftIcon={<User className="h-4 w-4" />}
                                disabled={isLoading}
                                labelRequired
                            />

                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange('password')}
                                error={errors.password}
                                leftIcon={<Lock className="h-4 w-4" />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="hover:text-[#1967d2] transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                }
                                disabled={isLoading}
                                labelRequired
                            />
                        </div>

                        <div className="flex items-center justify-end ">
                            <Button
                                variant="link"
                                type="button"
                                className="p-0 h-fit text-xs !font-semibold cursor-pointer text-[#1967d2] hover:underline hover:scale-100"
                            >
                                Forgot password?
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#e8eaed]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-[#5f6368] text-xs">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={onSSOClick}
                    >
                        Sign In with SSO
                    </Button>
                </div>

                <div className='space-y-3 -mt-1'>
                    <div className="bg-transparent flex items-center justify-center gap-1">
                        <Typography variant="p" className="text-center text-xs text-[#5f6368]">
                            Butuh Bantuan?
                        </Typography>
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpenFAQ(true)}
                            className={cn(
                                "!px-0 h-0 flex items-center gap-1 text-xs text-[#5f6368] hover:text-[#1967d2] hover:bg-transparent transition-colors",
                                "group"
                            )}
                        >
                            <span className="font-medium underline">FAQ</span>
                        </Button>
                    </div>
                    <div className="bg-transparent flex items-center justify-center gap-2">
                        <Typography variant="p" className="text-center text-xs text-[#5f6368]">
                            © {new Date().getFullYear()} New CSMS
                        </Typography>
                        <Slash className="h-3 w-3 text-[#5f6368] rotate-135" />
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpenPrivacyPolicy(true)}
                            className={cn(
                                "!px-0 h-0 flex items-center gap-1 text-xs text-[#5f6368] hover:text-[#1967d2] hover:bg-transparent transition-colors",
                                "group"
                            )}
                        >
                            <Shield className="h-4 w-4 group-hover:text-[#1967d2] transition-colors" />
                            <span className="font-medium underline">Privacy Policy</span>
                        </Button>
                    </div>
                </div>
            </div>

            <PrivacyFAQModal
                open={isOpenPrivacyPolicy}
                onOpenChange={setIsOpenPrivacyPolicy}
                mode={isMobile ? 'drawer' : 'dialog'}
                data={privacyPolicyData}
                modalName="privacy-policy"
            />
            <PrivacyFAQModal
                open={isOpenFAQ}
                onOpenChange={setIsOpenFAQ}
                mode={isMobile ? 'drawer' : 'dialog'}
                data={faqData}
                modalName="faq"
            />
        </>
    );
}