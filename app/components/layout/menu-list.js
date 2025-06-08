"use client";

import Link from "next/link"
import * as React from "react"

import { cn } from "@/libs/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SideAccordion from "./accordion-menu";



const MenuList = ({ categories }) => {
    return (
        <div className="hidden md:flex text-gray-200 md:space-x-3 lg:space-x-6  text-lg md:font-light  lg:font-normal capitalize tracking-wider  ">

            <NavigationMenu>
                <NavigationMenuList>

                    <NavigationMenuItem>
                        <Link href={`/`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href={`/about-us`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 md:w-[500px] lg:w-[600px] relative z-max  ">

                                <SideAccordion Categories={categories.data} />

                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <Link href={`/blog`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Blog
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                        <Link href={`/contact`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Contact Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>


                </NavigationMenuList>

            </NavigationMenu>



        </div>

    )
}

export default MenuList
