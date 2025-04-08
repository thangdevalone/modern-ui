"use client";

import { Stepper } from "@/components/modern-ui/stepper";
import { Button } from "@/components/modern-ui/button";
import { useState } from "react";

export function HorizontalStepperDemo() {
  const steps = [
    { id: 1, title: "Account Details" },
    { id: 2, title: "Personal Information" },
    { id: 3, title: "Review & Submit" },
  ];

  return <Stepper steps={steps} activeStep={1} />;
}

export function VerticalStepperDemo() {
  const steps = [
    { id: 1, title: "Account Details" },
    { id: 2, title: "Personal Information" },
    { id: 3, title: "Review & Submit" },
  ];

  return <Stepper steps={steps} activeStep={1} orientation="vertical" />;
}

export function InteractiveStepperDemo() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, title: "Account Details" },
    { id: 2, title: "Personal Information" },
    { id: 3, title: "Review & Submit" },
  ];

  return (
    <div className="space-y-6">
      <Stepper steps={steps} activeStep={activeStep} />

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))
          }
          disabled={activeStep === steps.length - 1}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function StepperWithContentDemo() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Account Details",
      children: () => (
        <div className="p-4 bg-background border rounded-md">
          <h3 className="text-sm font-medium mb-2">Create your account</h3>
          <p className="text-muted-foreground text-sm">
            Enter your email and password to create your account.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Personal Information",
      children: () => (
        <div className="p-4 bg-background border rounded-md">
          <h3 className="text-sm font-medium mb-2">Your personal details</h3>
          <p className="text-muted-foreground text-sm">
            Provide your personal details to complete your profile.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Review & Submit",
      children: () => (
        <div className="p-4 bg-background border rounded-md">
          <h3 className="text-sm font-medium mb-2">Confirm submission</h3>
          <p className="text-muted-foreground text-sm">
            Review all your information before submitting.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Stepper steps={steps} activeStep={activeStep} orientation="vertical" lineLast={true} />
  );
}
