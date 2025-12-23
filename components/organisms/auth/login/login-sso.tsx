'use client';

import { useState } from 'react';
import { ArrowLeft, Shield, Loader2 } from 'lucide-react';
import { Button, Typography, Badge } from '@/components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SSOLoginProps {
    onBackClick: () => void;
}

export function SSOLogin({ onBackClick }: SSOLoginProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSSOLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 2000);
    };

    return (
        <div className="space-y-8 relative h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
            <div className='flex items-center justify-between absolute  top-0 left-0 right-0'>
                <Button
                    variant="ghost"
                    onClick={onBackClick}
                    className="h-0 px-0 flex items-center gap-2 text-[#5f6368] hover:scale-100 hover:bg-transparent hover:text-[#1967d2] transition-colors"
                    disabled={isLoading}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back to Sign In</span>
                </Button>

                <Image src="/images/Logo_PLN-horizontal.png" alt="Logo" width={80} height={25} />
            </div>
            <div className="space-y-8 mt-16">


                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#1967d2] opacity-20 animate-ping"></div>

                        <div className="relative flex items-center justify-center rounded-full w-24 h-24 bg-gradient-to-b from-[#1967d2] to-[#1557b0] shadow-xl">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                    </div>

                    <Badge variant="default" className="text-xs">
                        Single Sign-On
                    </Badge>

                    <div className="space-y-2">
                        <Typography variant="h3" className="text-[#202124]">
                            Sign in with SSO
                        </Typography>
                        <Typography variant="p" className="text-[#5f6368] max-w-sm mx-auto">
                            Use your organization's Single Sign-On credentials to access CSMS securely with one click.
                        </Typography>
                    </div>
                </div>

                <Button
                    onClick={handleSSOLogin}
                    className="w-full h-12"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Authenticating...
                        </>
                    ) : (
                        <>
                            <Shield className="h-5 w-5 mr-2" />
                            Continue with SSO
                        </>
                    )}
                </Button>

                <div className="text-center pt-4">
                    <Typography variant="smallText" className="text-[#5f6368]">
                        You will be redirected to organization's login
                    </Typography>
                </div>
            </div>
        </div>
    );
}