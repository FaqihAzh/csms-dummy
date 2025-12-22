import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Combobox } from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "Components/Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {
    onSelect: { action: "selected" },
  },
}

export default meta
type Story = StoryObj<typeof Combobox>

// Mock Data
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

const foodGroups = [
  {
    heading: "Fruits",
    items: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "blueberry", label: "Blueberry" },
    ],
  },
  {
    heading: "Vegetables",
    items: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
    ],
  },
  {
    heading: "Meat",
    items: [
      { value: "beef", label: "Beef" },
      { value: "chicken", label: "Chicken" },
    ],
  },
]

const ComboboxWithState = (args: any) => {
  const [value, setValue] = useState("")
  return <Combobox {...args} value={value} onSelect={setValue} />
}

export const Default: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    label: "Framework",
    placeholder: "Select framework...",
    options: frameworks,
  },
}

export const Grouped: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    label: "Grocery List",
    placeholder: "Select food...",
    groups: foodGroups,
  },
}

export const Disabled: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    label: "Disabled Input",
    placeholder: "Cannot select...",
    options: frameworks,
    disabled: true,
  },
}