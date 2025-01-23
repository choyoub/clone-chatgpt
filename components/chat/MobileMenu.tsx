"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import useSheetStore from "@/store/sheet";
import { ReactNode } from "react";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const { open, setOpen } = useSheetStore();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="hidden">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
