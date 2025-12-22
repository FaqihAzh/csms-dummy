import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BackToTop } from './back-to-top';

describe('BackToTop Component', () => {
    let container: HTMLElement;

    beforeEach(() => {
        // Setup a mock container in the document body
        container = document.createElement('div');
        container.id = 'scroll-target';
        container.style.height = '500px';
        container.style.overflowY = 'scroll';
        document.body.appendChild(container);

        // Mock scrollTo
        container.scrollTo = vi.fn();
    });

    afterEach(() => {
        document.body.removeChild(container);
        vi.restoreAllMocks();
    });

    it('should not be visible initially', () => {
        render(<BackToTop targetSelector="#scroll-target" />);
        const button = screen.queryByRole('button', { name: /back to top/i });
        expect(button).not.toBeInTheDocument();
    });

    it('should become visible when scrolled past threshold', () => {
        render(<BackToTop targetSelector="#scroll-target" threshold={100} />);

        // Simulate scroll
        Object.defineProperty(container, 'scrollTop', { value: 150, writable: true });
        fireEvent.scroll(container);

        const button = screen.getByRole('button', { name: /back to top/i });
        expect(button).toBeInTheDocument();
    });

    it('should hide when scrolled back up', () => {
        render(<BackToTop targetSelector="#scroll-target" threshold={100} />);

        // Scroll down
        Object.defineProperty(container, 'scrollTop', { value: 150, writable: true });
        fireEvent.scroll(container);
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument();

        // Scroll up
        Object.defineProperty(container, 'scrollTop', { value: 50, writable: true });
        fireEvent.scroll(container);
        expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument();
    });

    it('should scroll to top when clicked', () => {
        render(<BackToTop targetSelector="#scroll-target" threshold={100} />);

        // Make visible
        Object.defineProperty(container, 'scrollTop', { value: 150, writable: true });
        fireEvent.scroll(container);

        const button = screen.getByRole('button', { name: /back to top/i });
        fireEvent.click(button);

        expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should use custom smooth behavior', () => {
        render(<BackToTop targetSelector="#scroll-target" threshold={100} smooth={false} />);

        // Make visible
        Object.defineProperty(container, 'scrollTop', { value: 150, writable: true });
        fireEvent.scroll(container);

        const button = screen.getByRole('button', { name: /back to top/i });
        fireEvent.click(button);

        expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    });
});
