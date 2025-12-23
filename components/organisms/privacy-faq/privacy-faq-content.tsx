'use client';
import {
    Typography,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Button,
} from '@/components';
import { ChevronDown } from 'lucide-react';

type PrivacyFAQ = {
    id: number;
    title: string;
    content: string;
};

export function PrivacyFAQContent({ data, modalName }: { data: PrivacyFAQ[], modalName?: string }) {
    if (!data || data.length === 0) return null;

    const [head, ...rest] = data;

    return (
        <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <Typography variant="h4" className="text-blue-900 mb-2">
                    {head.title}
                </Typography>
                <div
                    className="text-sm text-blue-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: head.content }}
                />
            </div>


            <div className="space-y-3">
                {rest.map((item) => (
                    <Collapsible key={item.id}>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full justify-between h-auto py-3 px-4 hover:bg-gray-100 rounded-lg border border-gray-200 group"
                            >
                                <span className="text-sm font-medium text-gray-900 text-left" dangerouslySetInnerHTML={{ __html: item.title }} />
                                <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="px-4 py-3 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                                <div
                                    className="text-sm text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    );
}