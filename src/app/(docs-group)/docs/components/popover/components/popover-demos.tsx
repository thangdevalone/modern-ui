import { Popover, PopoverTrigger, PopoverContent } from "@/components/modern-ui/popover";
import { Button } from "@/components/modern-ui/button";
import { Input } from "@/components/modern-ui/input";
import { Label } from "@/components/modern-ui/label";

export function BasicPopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Basic Popover</h4>
            <p className="text-sm text-muted-foreground">
              This is a simple popover with a title and description.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverWithFormDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Update Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AlignmentPopoverDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Align Start</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the start of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button>Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Align Center</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the center of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button>Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60">
          <div className="space-y-2">
            <h4 className="font-medium">Align End</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the end of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 