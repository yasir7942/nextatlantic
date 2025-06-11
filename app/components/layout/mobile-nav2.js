'use client'

import { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import SocialIcons from '../elements/social-icons'
import siteConfig from '@/config/site'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const MobileNavigation2 = ({ productCategory }) => {
  const [openSheet, setOpenSheet] = useState(false)
  const [activeParent, setActiveParent] = useState(null)

  const handleBack = () => setActiveParent(null)

  return (
    <div>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <button aria-label="Mobile Menu">
            <IoMdMenu size={32} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 bg-[#1c1c1c] text-white z-max overflow-y-auto hide-scrollbar ">
          <SheetHeader>
            <SheetTitle className="hidden" />
            <SheetDescription />

            <div className="flex flex-col w-full h-full justify-between items-left relative     ">
              {/* Logo */}
              <Link href="/" onClick={() => setOpenSheet(false)} className="w-[80%] mb-6">
                <Image
                  src="/images/logo-332x88.png"
                  width={332}
                  height={88}
                  alt="Atlantic Grease and Lubricants logo"
                />
              </Link>

              {/* Menu Content */}
              {!activeParent ? (
                <ul className="flex flex-col text-gray-200 mt-4 space-y-3 text-left text-lg font-light capitalize tracking-wider w-full">
                  {/* Static Links */}
                  <li>
                    <Link href="/" onClick={() => setOpenSheet(false)}>Home</Link>
                  </li>
                  <li>
                    <Link href="/about-us" onClick={() => setOpenSheet(false)}>About Us</Link>
                  </li>
                  <li>
                    <Link href="/blog" onClick={() => setOpenSheet(false)}>Blog</Link>
                  </li>

                  <li>
                    <Link href="#" className="font-semibold">Products</Link>
                  </li>

                  {/* Dynamic Product Categories */}
                  {productCategory?.data?.map((item) => (
                    <li key={item.id}>
                      {item.child?.data?.length > 0 ? (
                        <button
                          onClick={() => setActiveParent(item)}
                          className="w-full text-left hover:underline pl-2 text-base tracking-wide"
                        >
                          {item.title}
                        </button>
                      ) : (
                        <Link
                          href={`/product-category/${item.slug || ''}`}
                          onClick={() => setOpenSheet(false)}
                          className="block hover:underline pl-2 text-base tracking-wide"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  ))}

                  <li>
                    <Link href="/contact" onClick={() => setOpenSheet(false)}>Contact Us</Link>
                  </li>
                </ul>
              ) : (
                <div className="w-full text-left">
                  <button
                    onClick={handleBack}
                    className="flex items-center mb-4 text-blue-400"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </button>
                  <Link
                    href={`/product-category/${activeParent.slug || ''}`}
                    onClick={() => setOpenSheet(false)}
                    className="block hover:underline pl-2 text-base tracking-wide"
                  >
                    <h2 className="text-lg font-semibold mb-4">{activeParent.title} </h2>
                  </Link>

                  <ul className="space-y-3">
                    {activeParent.child?.data?.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={`/product-category/${child.slug}`}
                          onClick={() => {
                            handleBack()
                            setOpenSheet(false)
                          }}
                          className="block text-gray-200 hover:underline pl-2 text-base tracking-wide"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Icons */}
              <ul className="flex text-white space-x-7 mt-10 mb-10">
                <li>
                  <SocialIcons plateform="facebook" link={siteConfig.socialMedia.facebook} />
                </li>
                <li>
                  <SocialIcons plateform="instagram" link={siteConfig.socialMedia.instagram} />
                </li>
                <li>
                  <SocialIcons plateform="twitter" link={siteConfig.socialMedia.twitter} />
                </li>
                <li>
                  <SocialIcons plateform="youtube" link={siteConfig.socialMedia.youtube} />
                </li>
              </ul>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavigation2
