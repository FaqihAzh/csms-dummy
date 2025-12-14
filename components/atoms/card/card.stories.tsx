import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "../button/button";
import { Badge } from "../badge/badge";
import {
  Bell,
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  Download,
  Mail,
  MessageSquare,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is the card content. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A simple card with just title and content, no footer.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">New message received</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Settings updated</p>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-success">+20.1%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-success">+180.1%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-success">+201</span> since last hour
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <span className="text-4xl">📱</span>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">iPhone 15 Pro</CardTitle>
            <CardDescription>Latest flagship smartphone</CardDescription>
          </div>
          <Badge variant="success">In Stock</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Storage</span>
            <span className="text-sm font-medium">256GB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Color</span>
            <span className="text-sm font-medium">Titanium Blue</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-lg font-bold">$999.00</span>
            <div className="flex items-center gap-1 text-warning">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold">
            JD
          </div>
        </div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Engineer at Tech Corp</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">john.doe@example.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Joined December 2024</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">128 posts</span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Node.js</Badge>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">Follow</Button>
        <Button variant="outline" className="flex-1">
          Message
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="relative">
        <CardHeader>
          <CardTitle>Starter</CardTitle>
          <CardDescription>Perfect for individuals</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">$9</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Up to 10 projects</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">5GB storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Basic support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Get Started
          </Button>
        </CardFooter>
      </Card>

      <Card className="relative border-primary shadow-lg">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>Popular</Badge>
        </div>
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <CardDescription>For growing teams</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Unlimited projects</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">50GB storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Advanced analytics</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Started</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <CardDescription>For large organizations</CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">$99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Unlimited everything</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">500GB storage</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">24/7 support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Custom integrations</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">Dedicated account manager</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Contact Sales
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const PaymentMethodCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg">Payment Method</CardTitle>
        <CardDescription>Add a new payment method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Card Number</label>
          <div className="flex items-center gap-2 p-3 border rounded-md">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-3 border rounded-md text-sm outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full p-3 border rounded-md text-sm outline-none"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Card</Button>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveCard: Story = {
  render: () => (
    <Card className="w-[350px] transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="success">+12.5%</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2">Monthly Sales</CardTitle>
        <div className="text-3xl font-bold mb-1">$54,239</div>
        <CardDescription>Compared to $48,293 last month</CardDescription>
        <div className="mt-4 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-md flex items-end p-2 gap-1">
          {[40, 60, 45, 80, 65, 75, 90].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary rounded-sm"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="h-6 w-6 text-success" />
          </div>
          <h3 className="font-semibold">Success!</h3>
          <p className="text-sm text-muted-foreground">
            Your changes have been saved successfully.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};