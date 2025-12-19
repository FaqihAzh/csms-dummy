"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils/cn"

export interface TabItem {
    value: string
    label: string | React.ReactNode
    content?: React.ReactNode
    disabled?: boolean
    icon?: React.ReactNode
}

export interface TabsProps{
    tabs: TabItem[]
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    variant?: 'default' | 'underline' | 'pills'
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex bg-transparant rounded-none border-b p-0",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "bg-background text-muted-foreground p-3 data-[state=inactive]:hover:bg-muted/50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:h-full data-[state=active]:rounded-none data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function TabsPanel({
    tabs,
    defaultValue,
    value,
    onValueChange,
    variant,
    className,
    orientation = 'horizontal',
}: TabsProps) {
    const getListClassName = () => {
        switch (variant) {
          case 'underline':
              return "bg-transparent justify-start rounded-none border-b p-0 h-10"
          case 'pills':
              return "bg-muted/50 p-1 rounded-lg"
          default:
              return "bg-muted p-2 rounded-lg"
        }
    }

    const getTriggerClassName = () => {
        switch (variant) {
          case 'underline':
              return "bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-full rounded-none data-[state=active]:shadow-none data-[state=active]:text-primary"
          case 'pills':
              return "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md"
          default:
              return ""
        }
    }

    return (
        <Tabs 
            defaultValue={defaultValue || tabs[0]?.value} 
            onValueChange={onValueChange}
            orientation={orientation}
            className={cn(
                orientation === 'vertical' && "flex flex-row gap-8",
                className
            )}
        >
            <TabsList 
                className={cn(
                    getListClassName(),
                    orientation === 'vertical' && "flex-col h-auto w-full gap-8"
                )}
            >
                {tabs.map(tab => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className={cn(
                            getTriggerClassName(),
                            orientation === 'vertical' && "flex-col h-auto w-48"
                        )}
                    >
                    {tab.icon && <span className="mr-2">{tab.icon}</span>}
                    {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    <p className='text-muted-foreground text-sm'>{tab.content}</p>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsPanel }