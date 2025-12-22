import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Settings, Share2, ShoppingCart, Bell, User } from "lucide-react";
import { cn } from "@/lib";
import { Button } from "../button/button";

const meta: Meta<typeof Drawer> = {
  title: "Components/UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer description. You can add any content here.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here. You can add forms, lists, or any other
            components.
          </p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [goal, setGoal] = useState(350);

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button leftIcon={<Settings className="h-4 w-4" />}>
            Set Goal
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Set Your Daily Goal</DrawerTitle>
            <DrawerDescription>
              Adjust your daily activity goal. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGoal(Math.max(200, goal - 10))}
              >
                -
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGoal(Math.min(500, goal + 10))}
              >
                +
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((goal - 200) / 300) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Save Goal</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const ShoppingCartExample: Story = {
  render: () => {
    const items = [
      { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1 },
      { id: 2, name: "Smart Watch", price: 249.99, quantity: 1 },
      { id: 3, name: "USB-C Cable", price: 19.99, quantity: 2 },
    ];

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button leftIcon={<ShoppingCart className="h-4 w-4" />}>
            View Cart ({items.length})
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Shopping Cart</DrawerTitle>
            <DrawerDescription>
              Review your items before checkout
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 max-h-[400px] overflow-auto">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Proceed to Checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Continue Shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const NotificationSettings: Story = {
  render: () => {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [smsNotifs, setSmsNotifs] = useState(false);

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" leftIcon={<Bell className="h-4 w-4" />}>
            Notifications
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Notification Settings</DrawerTitle>
            <DrawerDescription>
              Choose how you want to receive notifications
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={emailNotifs}
                  onClick={() => setEmailNotifs(!emailNotifs)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    emailNotifs ? "bg-primary" : "bg-input"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      emailNotifs ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Push Notifications</label>
                  <p className="text-xs text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={pushNotifs}
                  onClick={() => setPushNotifs(!pushNotifs)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    pushNotifs ? "bg-primary" : "bg-input"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      pushNotifs ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">SMS Notifications</label>
                  <p className="text-xs text-muted-foreground">
                    Receive text messages for important updates
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={smsNotifs}
                  onClick={() => setSmsNotifs(!smsNotifs)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    smsNotifs ? "bg-primary" : "bg-input"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      smsNotifs ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Save Preferences</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const ShareDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" leftIcon={<Share2 className="h-4 w-4" />}>
          Share
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share this content</DrawerTitle>
          <DrawerDescription>
            Choose how you want to share
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="grid grid-cols-4 gap-4 text-center">
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">Copy Link</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">Email</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">Twitter</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">Facebook</span>
            </button>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Drawer</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close from Outside
          </Button>
        </div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer's open state is controlled externally
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <p className="text-sm text-muted-foreground">
                Drawer state: {open ? "Open" : "Closed"}
              </p>
            </div>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};