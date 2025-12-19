import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
import { describe, it, expect, vi } from 'vitest';

describe('Collapsible', () => {
    it('renders correctly', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        expect(screen.getByText('Toggle')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('toggles content on trigger click', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        const trigger = screen.getByText('Toggle');
        const content = screen.getByText('Content');

        // Initially closed (data-state="closed")
        expect(content).toHaveAttribute('data-state', 'closed');

        // Click to open
        fireEvent.click(trigger);
        expect(content).toHaveAttribute('data-state', 'open');

        // Click to close
        fireEvent.click(trigger);
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    it('works in controlled mode', () => {
        const onOpenChange = vi.fn();
        const { rerender } = render(
            <Collapsible open={false} onOpenChange={onOpenChange}>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        const trigger = screen.getByText('Toggle');
        const content = screen.getByText('Content');

        expect(content).toHaveAttribute('data-state', 'closed');

        fireEvent.click(trigger);
        expect(onOpenChange).toHaveBeenCalledWith(true);

        // Simulate parent component updating state
        rerender(
            <Collapsible open={true} onOpenChange={onOpenChange}>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        expect(content).toHaveAttribute('data-state', 'open');
    });

    it('has proper ARIA attributes', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        const trigger = screen.getByText('Toggle');

        expect(trigger).toHaveAttribute('aria-expanded');
        expect(trigger).toHaveAttribute('aria-controls');
    });

    it('supports keyboard navigation', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );

        const trigger = screen.getByText('Toggle');
        const content = screen.getByText('Content');

        // Initially closed
        expect(content).toHaveAttribute('data-state', 'closed');

        // Press Enter to open
        fireEvent.keyDown(trigger, { key: 'Enter', code: 'Enter' });
        expect(content).toHaveAttribute('data-state', 'open');

        // Press Space to close
        fireEvent.keyDown(trigger, { key: ' ', code: 'Space' });
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    it('applies custom className to CollapsibleContent', () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent className="custom-class">Content</CollapsibleContent>
            </Collapsible>
        );

        const content = screen.getByText('Content');
        expect(content).toHaveClass('custom-class');
    });
});
