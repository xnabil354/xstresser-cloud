"use client";
import { Cloud, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toogle-theme";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <Cloud className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        X - Stresser
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Cloud className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    X - Stresser
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant="ghost"
                  className="justify-start text-base"
                >
                  <Link href="/#price" className="justify-start text-base">
                    Price
                  </Link>
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant="ghost"
                  className="justify-start text-base"
                >
                  <Link
                    href="/#testimonials"
                    className="justify-start text-base"
                  >
                    Testimonials
                  </Link>
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant="ghost"
                  className="justify-start text-base"
                >
                  <Link href="/#faq" className="justify-start text-base">
                    FAQ
                  </Link>
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  asChild
                  variant="ghost"
                  className="justify-start text-base"
                >
                  <Link href="/order" className="justify-start text-base">
                    Order Now
                  </Link>
                </Button>
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/#price" className="text-base px-2">
                Price
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/#testimonials" className="text-base px-2">
                Testimonials
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/#faq" className="text-base px-2">
                FAQ
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link href="/order" className="text-base px-2">
                Order Now
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
