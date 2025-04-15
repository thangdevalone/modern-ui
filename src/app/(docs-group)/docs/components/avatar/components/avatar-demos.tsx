"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/modern-ui/avatar";
import { AvatarGroup } from "@/components/modern-ui/avatar-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";

export function BasicAvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
      <AvatarFallback>MA</AvatarFallback>
    </Avatar>
  );
}

export function AvatarWithFallbackDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://broken-link.jpg" alt="John Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}

export function AvatarSizesDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <Avatar className="h-15 w-15">
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarGroupDemo() {
  return (
    <AvatarGroup limit={3}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}

export function AvatarGroupWithTooltipDemo() {
  return (
    <TooltipProvider>
      <AvatarGroup limit={3}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Christian</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Vercel</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>John Doe</TooltipContent>
        </Tooltip>
        <Avatar>
          <AvatarFallback>+2</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </TooltipProvider>
  );
}
