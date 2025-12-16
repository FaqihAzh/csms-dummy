import { Button, Badge, Checkbox, Input, RadioGroup, DatePicker } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-4">
      <Button>Button</Button>
      <Badge>Badge</Badge>
      <Checkbox label="Accept terms and conditions" />
      <Input
        label="Email Address"
        placeholder="Enter your email"
        type="email"
      />
      <RadioGroup
        label="Choose your plan"
        options={[
          {
            label: 'Free',
            value: 'free'
          },
          {
            label: 'Pro',
            value: 'pro'
          },
          {
            label: 'Enterprise',
            value: 'enterprise'
          }
        ]}
        orientation="horizontal"
      />
      <DatePicker placeholder="Select date" />
    </div>
  );
}
