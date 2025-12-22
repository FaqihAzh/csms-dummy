'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Button, Input, Typography } from '@/components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
        <div className='space-y-6'>
            <div className="flex items-center">
                <Image src="/images/Logo_PLN-horizontal.png" alt="Logo" width={120} height={45} />
            </div>

            <div>
                <Typography variant="h3" className="text-[#202124] leading-none -mb-3">
                    Sign In
                </Typography>
                <Typography variant="p" className="text-[#5f6368] text-sm leading-6 -mt-4">
                    Welcome back! Please enter your credentials to access the Contractor Safety Management System.
                </Typography>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="flex items-center justify-end">
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
    );
}