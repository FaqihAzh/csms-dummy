import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Badge } from "../badge/badge";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm py-2 border-b">
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
      <h3 className="text-lg font-semibold mb-4">Long Content</h3>
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i} className="text-sm mb-3 text-muted-foreground">
          This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      ))}
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-32 w-32 flex items-center justify-center rounded-md bg-secondary text-secondary-foreground shrink-0"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[500px] rounded-md border">
      <div className="p-4" style={{ width: "800px" }}>
        <h3 className="text-lg font-semibold mb-4">
          Scroll Both Horizontally and Vertically
        </h3>
        <div className="grid grid-cols-10 gap-4">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-20 flex items-center justify-center rounded-md bg-primary text-primary-foreground text-xs"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <ScrollArea className="w-full rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="shrink-0">
            <div className="h-48 w-48 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
              Image {i + 1}
            </div>
            <p className="text-sm mt-2 text-center text-muted-foreground">
              Photo {i + 1}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const TagsList: Story = {
  render: () => (
    <ScrollArea className="h-48 w-full rounded-md border">
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-medium mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Python",
            "Go",
            "Rust",
            "Java",
            "C++",
            "Swift",
            "Kotlin",
            "PHP",
            "Ruby",
            "Vue",
            "Angular",
            "Svelte",
            "Next.js",
            "Nuxt",
            "Gatsby",
            "Remix",
            "Express",
            "NestJS",
            "FastAPI",
            "Django",
            "Flask",
            "Spring",
            "Laravel",
            "Rails",
          ].map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4 bg-secondary/50">
        <pre className="text-sm">
          <code>{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const fastFib = memoize(fibonacci);

// Calculate Fibonacci numbers
for (let i = 0; i <= 20; i++) {
  console.log(\`Fibonacci(\${i}) = \${fastFib(i)}\`);
}

// More code examples
const data = [1, 2, 3, 4, 5];
const doubled = data.map(x => x * 2);
const sum = data.reduce((a, b) => a + b, 0);

class Calculator {
  constructor() {
    this.result = 0;
  }
  
  add(n) {
    this.result += n;
    return this;
  }
  
  subtract(n) {
    this.result -= n;
    return this;
  }
  
  getResult() {
    return this.result;
  }
}

const calc = new Calculator();
calc.add(5).subtract(3).add(10);
console.log(calc.getResult()); // 12`}</code>
        </pre>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const ChatMessages: Story = {
  render: () => (
    <ScrollArea className="h-96 w-full max-w-md rounded-md border">
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 3 === 0 ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                i % 3 === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <p className="text-sm">
                This is message {i + 1}. Lorem ipsum dolor sit amet.
              </p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};