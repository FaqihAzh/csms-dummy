import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components';
import { cn } from '@/lib/utils/cn';

interface SidebarHeaderProps {
    collapsed: boolean;
    onToggleCollapse?: () => void;
}

export function SidebarHeader({ collapsed, onToggleCollapse }: SidebarHeaderProps) {
    return (
        <div
            className={cn(
                'flex items-center border-b border-[#e8eaed] flex-shrink-0 h-16 transition-all duration-300',
                collapsed ? 'justify-center px-3' : 'justify-between px-5'
            )}
        >
            {!collapsed && (
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-lg flex-shrink-0 w-8 h-8 bg-gradient-to-b from-[#1967d2] to-[#1557b0] shadow-md">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path
                                d="M9 1.5L2.25 5.25V11.25C2.25 14.565 5.985 16.875 9 16.875C12.015 16.875 15.75 14.565 15.75 11.25V5.25L9 1.5Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.75 9L8.25 10.5L11.25 7.5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-[#202124] text-[15px] font-semibold leading-[22.5px]">CSMS</h4>
                    </div>
                </div>
            )}

            <Button
                variant="ghost"
                size="icon-sm"
                onClick={onToggleCollapse}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="transition-colors text-text-secondary hover:bg-[#fafbfc]"
            >
                {collapsed ? <PanelLeft size={18} className=' hover:text-primary' /> : <PanelLeftClose size={18} className=' hover:text-primary' />}
            </Button>
        </div>
    );
}
