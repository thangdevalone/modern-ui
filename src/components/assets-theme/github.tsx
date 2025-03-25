"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import githubWhite from "@/assets/github-mark-white.svg";
import github from "@/assets/github-mark.svg";

export const Github = ({ themeOverride, isInvert }: { themeOverride?: 'dark' | 'light'; isInvert?: boolean }) => {
  const { resolvedTheme } = useTheme();

  const theme = themeOverride || resolvedTheme;

  if (!theme) return null;

  const imageSrc = isInvert
    ? theme === "dark" ? githubWhite : github
    : theme === "dark" ? github : githubWhite;

  return (
    <Image
      src={imageSrc}
      width={16}
      height={16}
      alt="github"
    />
  );
};

export default Github;
