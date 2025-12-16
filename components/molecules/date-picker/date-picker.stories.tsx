import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DateRangePicker } from "./date-picker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
    title: "Components/Form/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    args: {
        placeholder: "Select date",
    },
};

export const WithLabel: Story = {
    args: {
        label: "Birth Date",
        placeholder: "Select your birth date",
    },
};

export const Required: Story = {
    args: {
        label: "Event Date",
        labelRequired: true,
        placeholder: "Select date",
    },
};

export const WithError: Story = {
    args: {
        label: "Appointment Date",
        labelRequired: true,
        error: "Please select a valid date",
        placeholder: "Select date",
    },
};

export const WithHelperText: Story = {
    args: {
        label: "Meeting Date",
        helperText: "Choose a date for the meeting",
        placeholder: "Select date",
    },
};

export const WithDefaultValue: Story = {
    args: {
        label: "Selected Date",
        value: new Date(),
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled Date",
        disabled: true,
        value: new Date(),
    },
};

export const WithMinDate: Story = {
    args: {
        label: "Future Date Only",
        minDate: new Date(),
        helperText: "You can only select dates from today onwards",
    },
};

export const WithMaxDate: Story = {
    args: {
        label: "Past Date Only",
        maxDate: new Date(),
        helperText: "You can only select dates up to today",
    },
};

export const WithDateRange: Story = {
    render: () => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 30);

        return (
            <DatePicker
                label="Booking Date"
                minDate={today}
                maxDate={futureDate}
                helperText="Select a date within the next 30 days"
            />
        );
    },
};

export const DifferentFormats: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());

        return (
            <div className="space-y-4">
                <DatePicker
                    label="DD/MM/YYYY Format"
                    value={date}
                    onChange={setDate}
                    dateFormat="dd/MM/yyyy"
                />
                <DatePicker
                    label="MM/DD/YYYY Format"
                    value={date}
                    onChange={setDate}
                    dateFormat="MM/dd/yyyy"
                />
                <DatePicker
                    label="YYYY-MM-DD Format"
                    value={date}
                    onChange={setDate}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
        );
    },
};

export const WithoutClearButton: Story = {
    args: {
        label: "Date",
        showClearButton: false,
        value: new Date(),
    },
};

export const Controlled: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>();

        return (
            <div className="space-y-4">
                <DatePicker
                    label="Select Date"
                    value={date}
                    onChange={setDate}
                    helperText="The selected date will appear below"
                />
                {date && (
                    <div className="p-4 bg-secondary rounded-md">
                        <p className="text-sm">
                            <strong>Selected Date:</strong> {date.toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-1">
                            <strong>ISO String:</strong> {date.toISOString()}
                        </p>
                    </div>
                )}
            </div>
        );
    },
};

export const WithValidation: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>();
        const [error, setError] = useState("");

        const handleDateChange = (newDate: Date | undefined) => {
            setDate(newDate);

            if (!newDate) {
                setError("Date is required");
            } else {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (newDate < today) {
                    setError("Date cannot be in the past");
                } else {
                    setError("");
                }
            }
        };

        return (
            <DatePicker
                label="Event Date"
                labelRequired
                value={date}
                onChange={handleDateChange}
                error={error}
            />
        );
    },
};

export const FormExample: Story = {
    render: () => {
        const [formData, setFormData] = useState({
            startDate: undefined as Date | undefined,
            endDate: undefined as Date | undefined,
            birthDate: undefined as Date | undefined,
        });

        return (
            <div className="max-w-md space-y-4">
                <DatePicker
                    label="Start Date"
                    labelRequired
                    value={formData.startDate}
                    onChange={(date) => setFormData({ ...formData, startDate: date })}
                    minDate={new Date()}
                />
                <DatePicker
                    label="End Date"
                    labelRequired
                    value={formData.endDate}
                    onChange={(date) => setFormData({ ...formData, endDate: date })}
                    minDate={formData.startDate || new Date()}
                    disabled={!formData.startDate}
                    helperText={!formData.startDate ? "Please select start date first" : ""}
                />
                <DatePicker
                    label="Birth Date"
                    value={formData.birthDate}
                    onChange={(date) => setFormData({ ...formData, birthDate: date })}
                    maxDate={new Date()}
                    helperText="Optional"
                />
            </div>
        );
    },
};

// DateRangePicker Stories
export const RangePicker: StoryObj<typeof DateRangePicker> = {
    render: () => (
        <DateRangePicker
            label="Select Date Range"
            placeholder="Choose start and end dates"
        />
    ),
};

export const RangeWithValidation: StoryObj<typeof DateRangePicker> = {
    render: () => {
        const [range, setRange] = useState<{ from?: Date; to?: Date }>();
        const [error, setError] = useState("");

        const handleRangeChange = (newRange: { from?: Date; to?: Date } | undefined) => {
            setRange(newRange);

            if (newRange?.from && newRange?.to) {
                const daysDiff = Math.ceil((newRange.to.getTime() - newRange.from.getTime()) / (1000 * 60 * 60 * 24));

                if (daysDiff > 30) {
                    setError("Date range cannot exceed 30 days");
                } else {
                    setError("");
                }
            }
        };

        return (
            <div className="space-y-4">
                <DateRangePicker
                    label="Booking Period"
                    labelRequired
                    value={range}
                    onChange={handleRangeChange}
                    error={error}
                    helperText="Maximum 30 days range"
                />
                {range?.from && range?.to && !error && (
                    <div className="p-4 bg-secondary rounded-md">
                        <p className="text-sm">
                            <strong>From:</strong> {range.from.toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                            <strong>To:</strong> {range.to.toLocaleDateString()}
                        </p>
                        <p className="text-sm">
                            <strong>Duration:</strong> {Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                    </div>
                )}
            </div>
        );
    },
};