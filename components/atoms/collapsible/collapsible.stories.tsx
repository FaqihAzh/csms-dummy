import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
import { Button } from '@/components/atoms';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
    title: 'Components/UI/Collapsible',
    component: Collapsible,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
                <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                        @peduarte starred 3 repositories
                    </h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                    }`}
                            />
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                    @radix-ui/primitives
                </div>
                <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @stitches/react
                    </div>
                </CollapsibleContent>
            </Collapsible>
        );
    },
};

export const Uncontrolled: Story = {
    render: () => (
        <Collapsible className="w-[350px]">
            <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                    Can I use this in my project?
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        Toggle
                    </Button>
                </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-3 text-sm mt-2">
                Yes. Free to use for personal and commercial projects.
            </div>
            <CollapsibleContent className="mt-2">
                <div className="rounded-md border px-4 py-3 text-sm">
                    No attribution required, but appreciated!
                </div>
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const Nested: Story = {
    render: () => {
        const [parent, setParent] = useState(false);
        const [child1, setChild1] = useState(false);
        const [child2, setChild2] = useState(false);

        return (
            <Collapsible open={parent} onOpenChange={setParent} className="w-[400px]">
                <div className="flex items-center justify-between space-x-4 px-4 py-2 bg-gray-100 rounded">
                    <h4 className="text-sm font-semibold">Parent Section</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${parent ? 'rotate-180' : ''
                                    }`}
                            />
                        </Button>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="pl-4 mt-2 space-y-2">
                    <Collapsible open={child1} onOpenChange={setChild1}>
                        <div className="flex items-center justify-between space-x-4 px-4 py-2 bg-gray-50 rounded">
                            <h4 className="text-sm font-medium">Child Section 1</h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${child1 ? 'rotate-180' : ''
                                            }`}
                                    />
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="pl-4 mt-1">
                            <div className="rounded-md border px-4 py-2 text-sm">
                                Nested content 1
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={child2} onOpenChange={setChild2}>
                        <div className="flex items-center justify-between space-x-4 px-4 py-2 bg-gray-50 rounded">
                            <h4 className="text-sm font-medium">Child Section 2</h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform ${child2 ? 'rotate-180' : ''
                                            }`}
                                    />
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="pl-4 mt-1">
                            <div className="rounded-md border px-4 py-2 text-sm">
                                Nested content 2
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CollapsibleContent>
            </Collapsible>
        );
    },
};
