import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders correctly", () => {
      const { container } = render(<Card>Card content</Card>);
      const card = container.firstChild;
      expect(card).toBeInTheDocument();
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies default classes", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass("rounded-lg");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("bg-card");
      expect(card).toHaveClass("shadow-sm");
    });

    it("accepts custom className", () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass("custom-class");
    });

    it("renders as div element", () => {
      const { container } = render(<Card>Content</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.tagName).toBe("DIV");
    });

    it("supports additional HTML attributes", () => {
      render(<Card data-testid="test-card">Content</Card>);
      const card = screen.getByTestId("test-card");
      expect(card).toBeInTheDocument();
    });
  });

  describe("CardHeader", () => {
    it("renders correctly", () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("applies default classes", () => {
      const { container } = render(
        <Card>
          <CardHeader data-testid="header">Header</CardHeader>
        </Card>
      );
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("flex");
      expect(header).toHaveClass("flex-col");
      expect(header).toHaveClass("p-6");
    });

    it("accepts custom className", () => {
      render(
        <Card>
          <CardHeader className="custom-header" data-testid="header">
            Header
          </CardHeader>
        </Card>
      );
      const header = screen.getByTestId("header");
      expect(header).toHaveClass("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("renders correctly", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("renders as h3 element", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText("Title");
      expect(title.tagName).toBe("H3");
    });

    it("applies default classes", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText("Title");
      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-semibold");
    });

    it("accepts custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("renders correctly", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Description</CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByText("Description");
      expect(description.tagName).toBe("P");
    });

    it("applies default classes", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Description</CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("text-sm");
      expect(description).toHaveClass("text-muted-foreground");
    });

    it("accepts custom className", () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription className="custom-desc">
              Description
            </CardDescription>
          </CardHeader>
        </Card>
      );
      const description = screen.getByText("Description");
      expect(description).toHaveClass("custom-desc");
    });
  });

  describe("CardContent", () => {
    it("renders correctly", () => {
      render(
        <Card>
          <CardContent>Content area</CardContent>
        </Card>
      );
      expect(screen.getByText("Content area")).toBeInTheDocument();
    });

    it("applies default classes", () => {
      render(
        <Card>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      );
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("p-6");
      expect(content).toHaveClass("pt-0");
    });

    it("accepts custom className", () => {
      render(
        <Card>
          <CardContent className="custom-content" data-testid="content">
            Content
          </CardContent>
        </Card>
      );
      const content = screen.getByTestId("content");
      expect(content).toHaveClass("custom-content");
    });

    it("renders children correctly", () => {
      render(
        <Card>
          <CardContent>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
          </CardContent>
        </Card>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders correctly", () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("applies default classes", () => {
      render(
        <Card>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      );
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex");
      expect(footer).toHaveClass("items-center");
      expect(footer).toHaveClass("p-6");
      expect(footer).toHaveClass("pt-0");
    });

    it("accepts custom className", () => {
      render(
        <Card>
          <CardFooter className="custom-footer" data-testid="footer">
            Footer
          </CardFooter>
        </Card>
      );
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("custom-footer");
    });
  });

  describe("Complete Card", () => {
    it("renders all parts together", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
            <CardDescription>This is a complete card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText("Complete Card")).toBeInTheDocument();
      expect(screen.getByText("This is a complete card")).toBeInTheDocument();
      expect(screen.getByText("Card content goes here")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    });

    it("works without header", () => {
      render(
        <Card>
          <CardContent>Content only</CardContent>
        </Card>
      );
      expect(screen.getByText("Content only")).toBeInTheDocument();
    });

    it("works without footer", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("works with only content", () => {
      render(
        <Card>
          <CardContent>Minimal card</CardContent>
        </Card>
      );
      expect(screen.getByText("Minimal card")).toBeInTheDocument();
    });
  });
});