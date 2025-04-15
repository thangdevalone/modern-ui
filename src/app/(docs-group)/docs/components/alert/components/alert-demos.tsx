"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import { CircleAlert, CircleCheck, FileWarning, Info, Terminal } from "lucide-react";
import { Button } from "@/components/modern-ui/button";

export function BasicAlertDemo() {
  return (
    <Alert className="w-full max-w-md">
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}

export function WarningAlertDemo() {
  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}

export function SuccessAlertDemo() {
  return (
    <Alert className="border-green-500 bg-green-300 text-green-800 w-full max-w-md">
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  );
}

export function DestructiveAlertDemo() {
  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again to continue.
      </AlertDescription>
    </Alert>
  );
}

export function InfoAlertDemo() {
  return (
    <Alert className="w-full max-w-md bg-blue-50 border-blue-500 text-blue-800">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This page is still under construction. Some features may not work as expected.
      </AlertDescription>
    </Alert>
  );
}

export function AlertWithActionsDemo() {
  return (
    <Alert className="w-full max-w-md border-orange-600">
      <FileWarning className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-600">Unsaved Changes</AlertTitle>
      <AlertDescription>
        You have unsaved changes. Do you want to save or discard them?
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline">
            Save
          </Button>
          <Button size="sm" variant="destructive">
            Discard
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
