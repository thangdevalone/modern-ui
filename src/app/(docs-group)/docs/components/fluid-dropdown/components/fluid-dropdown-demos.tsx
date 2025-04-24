"use client";

import { FluidDropdown } from "@/components/modern-ui/fluid-dropdown";
import { 
  Layers, 
  Shirt, 
  Briefcase, 
  Smartphone, 
  Home,
  BookOpen, 
  Music, 
  Film, 
  Image, 
  Coffee,
  Sun, 
  Moon, 
  CloudRain, 
  Wind, 
  CloudSnow 
} from "lucide-react";

export function BasicFluidDropdownDemo() {
  const categories = [
    { id: "all", label: "All", icon: Layers, color: "#A06CD5" },
    { id: "lifestyle", label: "Lifestyle", icon: Shirt, color: "#FF6B6B" },
    { id: "desk", label: "Desk", icon: Briefcase, color: "#4ECDC4" },
    { id: "tech", label: "Tech", icon: Smartphone, color: "#45B7D1" },
    { id: "home", label: "Home", icon: Home, color: "#F9C74F" },
  ];

  return (
    <FluidDropdown 
      categories={categories}
      defaultCategoryId="all"
      className="max-w-[200px]"
    />
  );
}

export function CustomColorsFluidDropdownDemo() {
  const categories = [
    { id: "books", label: "Books", icon: BookOpen, color: "#8338EC" },
    { id: "music", label: "Music", icon: Music, color: "#3A86FF" },
    { id: "movies", label: "Movies", icon: Film, color: "#FF006E" },
    { id: "photos", label: "Photos", icon: Image, color: "#FB5607" },
    { id: "cafe", label: "Cafes", icon: Coffee, color: "#FFBE0B" },
  ];

  return (
    <FluidDropdown 
      categories={categories}
      defaultCategoryId="books"
    />
  );
}
