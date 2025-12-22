import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tabs> = {
    title: "Components/Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  {
    name: 'Explore',
    value: 'explore',
    className: '',
    content: (
      <>
        Discover <span className='text-foreground font-semibold'>fresh ideas</span>, trending topics, and hidden gems
        curated just for you. Start exploring and let your curiosity lead the way!
      </>
    )
  },
  {
    name: 'Favorites',
    value: 'favorites',
    className: '',
    content: (
      <>
        All your <span className='text-foreground font-semibold'>favorites</span> are saved here. Revisit articles,
        collections, and moments you love, any time you want a little inspiration.
      </>
    )
  },
  {
    name: 'Surprise Me',
    value: 'surprise',
    className: '',
    content: (
      <>
        <span className='text-foreground font-semibold'>Surprise!</span> Here&apos;s something unexpected—a fun fact, a
        quirky tip, or a daily challenge. Come back for a new surprise every day!
      </>
    )
  }
]

export const Default: Story = {
    render: () => {
    return (
        <Tabs defaultValue="explore">
            <TabsList>
            {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                {tab.name}
                </TabsTrigger>
            ))}
            </TabsList>
            {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
            </TabsContent>
            ))}
        </Tabs>
    )
  },
};

