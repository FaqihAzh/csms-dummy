import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from './back-to-top';

const meta: Meta<typeof BackToTop> = {
    title: 'Components/UI/BackToTop',
    component: BackToTop,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        threshold: {
            control: { type: 'number' },
            description: 'Scroll threshold to show the button',
        },
        smooth: {
            control: { type: 'boolean' },
            description: 'Enable smooth scrolling',
        },
        targetSelector: {
            control: { type: 'text' },
            description: 'Selector for the scrollable element',
        },
    },
};

export default meta;
type Story = StoryObj<typeof BackToTop>;

const ScrollableContainer = ({ children, id }: { children: React.ReactNode; id: string }) => (
    <div
        id={id}
        style={{
            height: '400px',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            padding: '20px',
        }}
    >
        {children}
        <div style={{ height: '2000px', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
            <p style={{ padding: '20px' }}>Scroll down to see the button...</p>
            <div style={{ height: '1000px' }}></div>
            <p style={{ padding: '20px' }}>Keep scrolling...</p>
        </div>
    </div>
);

export const Default: Story = {
    render: (args) => (
        <ScrollableContainer id="scroll-container">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Scroll Down Demo</h1>
                <p className="mb-4">The Back to Top button will appear when you scroll down.</p>
                <BackToTop {...args} targetSelector="#scroll-container" />
            </div>
        </ScrollableContainer>
    ),
    args: {
        threshold: 100,
        targetSelector: '#scroll-container',
    },
};

export const CustomThreshold: Story = {
    render: (args) => (
        <ScrollableContainer id="custom-threshold-container">
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Custom Threshold (300px)</h1>
                <p className="mb-4">Scroll down further to see the button.</p>
                <BackToTop {...args} targetSelector="#custom-threshold-container" />
            </div>
        </ScrollableContainer>
    ),
    args: {
        threshold: 300,
        targetSelector: '#custom-threshold-container',
    },
};
