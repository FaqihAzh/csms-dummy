// Typography.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Typography } from "./typography";

describe("Typography", () => {
  it("renders default variant (p)", () => {
    render(<Typography>Default</Typography>);
    const el = screen.getByText("Default");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("leading-7");
  });

  it("renders h1", () => {
    render(<Typography variant="h1">H1</Typography>);
    const el = screen.getByText("H1");
    expect(el.tagName).toBe("H1");
    expect(el).toHaveClass("text-4xl", "font-extrabold");
  });

  it("renders h2", () => {
    render(<Typography variant="h2">H2</Typography>);
    const el = screen.getByText("H2");
    expect(el.tagName).toBe("H2");
    expect(el).toHaveClass("text-3xl", "border-b");
  });

  it("renders blockquote", () => {
    render(<Typography variant="blockquote">Quote</Typography>);
    const el = screen.getByText("Quote");
    expect(el.tagName).toBe("BLOCKQUOTE");
    expect(el).toHaveClass("border-l-2", "italic");
  });

  it("renders list (ul)", () => {
    render(
      <Typography variant="list">
        <li>A</li>
      </Typography>
    );
    const ul = screen.getByText("A").parentElement!;
    expect(ul.tagName).toBe("UL");
    expect(ul).toHaveClass("list-disc");
  });

  it("renders inlineCode", () => {
    render(<Typography variant="inlineCode">const x = 1;</Typography>);
    const el = screen.getByText("const x = 1;");
    expect(el.tagName).toBe("CODE");
    expect(el).toHaveClass("font-mono", "bg-muted");
  });

  it("allows asChild to change element", () => {
    render(
      <Typography variant="h3" asChild>
        <span>H3 as span</span>
      </Typography>
    );
    const el = screen.getByText("H3 as span");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("text-2xl", "font-semibold");
  });

  it("accepts extra className", () => {
    render(<Typography className="extra">Extra</Typography>);
    expect(screen.getByText("Extra")).toHaveClass("extra");
  });
});