import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './dropdown'
import { Button } from '@/components/atoms'
import { Github, Mail, MessageSquare, PlusCircle, User, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { DropdownMenuCheckboxItem, DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
    title: 'Components/UI/Dropdown',
    component: DropdownMenu,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Profile</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const WithIcon: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu With Icon</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>
                    My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const Checkboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>With checkbox</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
                API
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                Invite users
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const RadioGroup: Story = {
    render: () => {
        const [ position, setPosition ] = useState('left');
        
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Position: {position}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>
                        Position
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup 
                        value={position}
                        onValueChange={(value) => setPosition(value as 'left' | 'right' | 'bottom' | 'top')}
                    >
                        <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>    
                        <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>    
                        <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>    
                        <DropdownMenuRadioItem value='left'>Left</DropdownMenuRadioItem>    
                    </DropdownMenuRadioGroup> 
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
}

export const WithSubmenu: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                    Open Menu with Submenu
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align='start'
                className='data-[state=closed]:slide-out-to-left-20 data-[state=open]:slide-in-from-left-20 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 w-56 duration-400'
            >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}