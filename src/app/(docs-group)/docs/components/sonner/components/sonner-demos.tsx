"use client";
import { Button } from "@/components/modern-ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function BasicSonnerDemo() {
  return (
    <Button variant="outline" onClick={() => toast("Event has been created")}>
      Show Toast
    </Button>
  );
}

export function SuccessSonnerDemo() {
  return (
    <Button
      onClick={() => {
        toast.success("Profile updated successfully");
      }}
    >
      Success Toast
    </Button>
  );
}

export function ErrorSonnerDemo() {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        toast.error("Something went wrong");
      }}
    >
      Error Toast
    </Button>
  );
}

export function TypesSonnerDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="default"
        onClick={() => toast.success("Operation completed successfully")}
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("An error occurred")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Here's some information")}
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.warning("Warning: This action is irreversible")}
      >
        Warning
      </Button>
    </div>
  );
}

export function CustomSonnerDemo() {
  return (
    <Button
      onClick={() => {
        toast(
          <div className="flex gap-2 items-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="flex flex-col">
              <span className="font-medium">Payment successful</span>
              <span className="text-xs text-gray-500">
                Transaction ID: 78912364
              </span>
            </div>
          </div>
        );
      }}
    >
      Custom Toast
    </Button>
  );
}

export function ActionsSonnerDemo() {
  return (
    <Button
      onClick={() => {
        toast("File deleted", {
          description: "The file has been permanently deleted",
          action: {
            label: "Undo",
            onClick: () => toast.success("Deletion undone"),
          },
          cancel: {
            label: "Dismiss",
            onClick: () => console.log("Toast dismissed"),
          },
        });
      }}
    >
      Delete File
    </Button>
  );
}

export function PromiseSonnerDemo() {
  const promise = () => {
    return new Promise<{ name: string }>((resolve) => {
      setTimeout(() => resolve({ name: "Modern UI" }), 2000);
    });
  };

  return (
    <Button
      onClick={() => {
        toast.promise(promise, {
          loading: "Loading data...",
          success: (data) => `Successfully loaded ${data.name}`,
          error: "Error loading data",
        });
      }}
    >
      Start Loading
    </Button>
  );
}
