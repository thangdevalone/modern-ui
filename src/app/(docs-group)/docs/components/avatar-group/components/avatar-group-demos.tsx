"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/modern-ui/avatar";
import { AvatarGroup } from "@/components/modern-ui/avatar-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/modern-ui/tooltip";

export function AvatarGroupDemo() {
  return (
    <AvatarGroup limit={3}>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="@dicebear" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan" alt="@dicebear" />
        <AvatarFallback>NO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Destiny" alt="@dicebear" />
        <AvatarFallback>DE</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Ryan" alt="@dicebear" />
        <AvatarFallback>RY</AvatarFallback>
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
              <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Maria" alt="Maria" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Maria</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Nolan" alt="Nolan" />
              <AvatarFallback>NO</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Nolan</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Destiny" alt="Destiny" />
              <AvatarFallback>DE</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>Destiny</TooltipContent>
        </Tooltip>
        <Avatar>
          <AvatarFallback>+2</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </TooltipProvider>
  );
} 