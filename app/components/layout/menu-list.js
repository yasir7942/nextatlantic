"use client";

import Link from "next/link"


const MenuList = () => {
    return (
        <ul className="hidden md:flex text-gray-200 md:space-x-3 lg:space-x-6  text-lg md:font-light  lg:font-normal capitalize tracking-wider ">
            <li><Link href={`/`} > Home</Link></li>
            <li><Link href={`/about-us`} > About Us</Link></li>
            <li> <Link href={`/products`} > Products </Link></li>
            <li><Link href={`/blog`}  > Blog </Link></li>
            <li><Link href={`/contact`}   > Contact Us</Link></li>
        </ul>

    )
}

export default MenuList
