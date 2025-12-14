import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta: Meta<typeof Typography> = {
  title: "Components/UI/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "list",
        "inlineCode",
        "lead",
        "largeText",
        "smallText",
        "muted",
      ],
    },
    asChild: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: "h1", children: "Heading 1" },
};
export const Heading2: Story = {
  args: { variant: "h2", children: "Heading 2" },
};
export const Heading3: Story = {
  args: { variant: "h3", children: "Heading 3" },
};
export const Heading4: Story = {
  args: { variant: "h4", children: "Heading 4" },
};
export const Paragraph: Story = {
  args: {
    variant: "p",
    children:
      "This is a paragraph of text. It demonstrates the default paragraph styling with proper line height and spacing.",
  },
};
export const Lead: Story = {
  args: {
    variant: "lead",
    children:
      "This is a lead paragraph. It's larger and muted to draw attention as an introduction or summary.",
  },
};
export const LargeText: Story = {
  args: { variant: "largeText", children: "This is large text for emphasis." },
};
export const SmallText: Story = {
  args: { variant: "smallText", children: "This is small text for captions or footnotes." },
};
export const Muted: Story = {
  args: { variant: "muted", children: "This is muted text for secondary information." },
};
export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    children:
      "This is a blockquote. It's used to highlight quotes or important excerpts from other sources.",
  },
};
export const InlineCode: Story = {
  args: { variant: "inlineCode", children: "npm install @radix-ui/react-toast" },
};
export const List: Story = {
  render: () => (
    <Typography variant="list">
      <li>First item in the list</li>
      <li>Second item in the list</li>
      <li>Third item in the list</li>
    </Typography>
  ),
};
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="lead">
        This is a lead paragraph that introduces a section or article.
      </Typography>
      <Typography variant="p">
        This is a regular paragraph. The default paragraph style includes proper spacing and line
        height for readability.
      </Typography>
      <Typography variant="blockquote">
        “This is a blockquote. Notice the left border and italic styling.”
      </Typography>
      <Typography variant="p">
        You can use inline code like{" "}
        <Typography variant="inlineCode" asChild>
          <span>const value = 42;</span>
        </Typography>{" "}
        within paragraphs.
      </Typography>
      <Typography variant="list">
        <li>First list item</li>
        <li>Second list item with more text to show wrapping behavior</li>
      </Typography>
      <div className="flex items-center gap-4">
        <Typography variant="largeText">LargeText</Typography>
        <Typography variant="smallText">SmallText</Typography>
        <Typography variant="muted">Muted</Typography>
      </div>
    </div>
  ),
};
export const Article: Story = {
  render: () => (
    <article className="max-w-3xl">
      <Typography variant="h1">Introduction to React Components</Typography>
      <Typography variant="lead">
        Learn how to build reusable and maintainable React components using modern best practices
        and TypeScript.
      </Typography>
      <Typography variant="h2">What are Components?</Typography>
      <Typography variant="p">
        Components are the building blocks of React applications. They let you split the UI into
        independent, reusable pieces.
      </Typography>
      <Typography variant="blockquote">
        “Components let you split the UI into independent, reusable pieces.” — React Documentation
      </Typography>
      <Typography variant="h3">Types of Components</Typography>
      <Typography variant="list">
        <li>
          <strong>Functional Components</strong> – Simple JavaScript functions that return JSX
        </li>
        <li>
          <strong>Class Components</strong> – ES6 classes that extend React.Component
        </li>
      </Typography>
      <Typography variant="h3">Example Code</Typography>
      <Typography variant="p">
        Here's a simple functional component:{" "}
        <Typography variant="inlineCode" asChild>
          <span>const Hello = () =&gt; &lt;h1&gt;Hello World&lt;/h1&gt;</span>
        </Typography>
      </Typography>
      <Typography variant="h4">Best Practices</Typography>
      <Typography variant="list">
        <li>Keep components small and focused</li>
        <li>Use meaningful names</li>
        <li>Write reusable code</li>
        <li>Add proper TypeScript types</li>
      </Typography>
      <Typography variant="muted">Last updated: December 2024</Typography>
    </article>
  ),
};
export const CustomElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h2" asChild>
        <h1>H2 styling with H1 element</h1>
      </Typography>
      <Typography variant="p" asChild>
        <div>Paragraph styling with div element</div>
      </Typography>
      <Typography variant="largeText" asChild>
        <span>Large text as span</span>
      </Typography>
    </div>
  ),
};