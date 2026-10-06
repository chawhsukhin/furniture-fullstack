import { useState, useEffect } from "react";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/api";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function LanguageToggle() {
  const [currentLng, setCurrentLng] = useState<string>("en");

  useEffect(() => {
    const lng = getCookie("i18next") || "en";
    setCurrentLng(lng);
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      await api.post(`change-language?lng=${lng}`);
      setCurrentLng(lng);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={currentLng === "en" ? "font-bold" : ""}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("mm")}
          className={currentLng === "mm" ? "font-bold" : ""}
        >
          🇲🇲 Myanmar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
