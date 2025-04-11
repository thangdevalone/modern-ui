"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerComp } from "sonner"

type SonnerProps = React.ComponentProps<typeof SonnerComp>

const SonnerGlobal = ({ ...props }: SonnerProps) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerComp
      theme={theme as SonnerProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { SonnerGlobal }
