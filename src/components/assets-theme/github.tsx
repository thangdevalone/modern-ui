"use client";
import {useTheme} from "next-themes";
import Image from "next/image";
import githubWhite from "@/assets/github-mark-white.svg";
import github from "@/assets/github-mark.svg";

export const Github = () => {
  const {resolvedTheme} = useTheme();

  if (!resolvedTheme) return null;

  return <Image className="mr-2" src={resolvedTheme === "dark" ? github : githubWhite} width={16} height={16}
                alt="github"/>;
};

export default Github;