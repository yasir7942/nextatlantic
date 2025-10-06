/* search-bar.js */
"use client";

import { geProductsBySearch } from "@/app/data/loader";
import Image from "next/image";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef, useEffect } from "react";
import { getImageUrl } from "@/libs/helper";
import { LineWave } from "react-loader-spinner";

const MIN_CHARS = 3;

const SearchBar = ({ dataType }) => {
  const [productData, setProductData] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const fetchResults = async (query) => {
    if (query.length >= MIN_CHARS) {
      setIsSearchVisible(true); // NEW: ensure dropdown stays open while fetching
      setIsLoading(true);
      try {
        const result = await geProductsBySearch(query);
        setProductData(Array.isArray(result?.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProductData([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setProductData([]);
      setIsLoading(false);
      // Don’t forcibly close here—let user decide; we’ll rely on outside click / escape / clear
    }
  };

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQuery(term);
    if (term.length >= MIN_CHARS) setIsSearchVisible(true); // NEW
    fetchResults(term);
  }, 300);

  const clearSearch = (e) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.value = "";
    setSearchQuery("");
    setProductData([]);
    setIsSearchVisible(false);
    setIsLoading(false);
  };

  // Use pointerdown so it runs before focus/blur reorderings
  useEffect(() => {
    const handlePointerDownOutside = (event) => {
      const el = searchContainerRef.current;
      if (el && !el.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSearchVisible(false);
    };

    document.addEventListener("pointerdown", handlePointerDownOutside, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Show dropdown when visible AND (loading OR we have a long-enough query)
  const showDropdown = isSearchVisible && (isLoading || searchQuery.length >= MIN_CHARS);

  const hasNoResults =
    !isLoading &&
    searchQuery.length >= MIN_CHARS &&
    Array.isArray(productData) &&
    productData.length === 0;

  return (
    <div
      className="flex flex-col relative w-full py-3 md:px-4 text-white text-center justify-center"
      ref={searchContainerRef}
    >
      <form
        className="flex item bg-center w-full gap-2 font-light text-gray-900"
        onSubmit={(e) => e.preventDefault()} // NEW: prevent form submit
        role="search"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      >
        <input
          placeholder={`Search ${dataType}`}
          name="searchbar"
          ref={inputRef}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery.length >= MIN_CHARS && setIsSearchVisible(true)} // NEW
          className="w-full px-5 py-2 text-white text-base bg-transparent outline-none border border-gray-300 border-solid"
          autoComplete="off"
        />

        {/* Loader */}
        {isLoading ? (
          <div>
            <div className="right-24 md:right-32 -top-[0px] absolute hidden md:block">
              <LineWave
                visible={true}
                height="130"
                width="130"
                wrapperStyle={{
                  margin: "-3.7rem auto",
                  transform: "scale(1.2)",
                  transformOrigin: "center",
                  display: "inline-block",
                }}
                firstLineColor="#BA1D20"
                middleLineColor="#DDDDDE"
                lastLineColor="#0A6FB1"
                ariaLabel="loading..."
              />
            </div>
            <div className="right-14 -top-8 absolute md:hidden">
              <LineWave
                visible={true}
                height="110"
                width="90"
                firstLineColor="#BA1D20"
                middleLineColor="#DDDDDE"
                lastLineColor="#0A6FB1"
                ariaLabel="loading..."
              />
            </div>
          </div>
        ) : (
          <span />
        )}

        <button
          type="button" // NEW
          onClick={clearSearch}
          className="px-5 py-3 whitespace-nowrap bg-white border border-gray-300 border-solid"
        >
          Clear
        </button>
      </form>

      {/* Results / Empty state */}
      <div
        className={`${showDropdown ? "" : "hidden"} w-[93%] text-left h-auto absolute top-[67px] z-50 left-5 bg-gray-500 backdrop-blur-md bg-opacity-50 border border-1 border-gray-700 mt-1 p-5`} // z-50 (safe)
        role="listbox"
        aria-live="polite"
      >
        {/* Results */}
        {productData?.length > 0 && (
          <div className="flex flex-col space-y-2">
            {productData.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => setIsSearchVisible(false)} // optional: close on selection
              >
                <div className="flex flex-col space-y-3 hover:bg-gray-600">
                  <div className="flex justify-start space-x-5 items-center pl-1">
                    {product?.productImage?.formats?.thumbnail?.url ? (
                      <Image
                        src={getImageUrl(product.productImage.formats.thumbnail.url)}
                        className="items-center w-16 md:w-12"
                        width={100}
                        height={100}
                        alt={
                          product?.productImage?.alternativeText ??
                          product?.title ??
                          "Product"
                        }
                      />
                    ) : null}

                    <div className="font-light text-sm text-gray-50 tracking-widest">
                      {product.product_categories?.data?.[0]?.title}: {product.title}
                    </div>

                    <div className="flex text-darkYellow justify-center items-center text-center font-light text-sm space-x-2">
                      <div>{product.grade}</div>
                      <div>{product.api}</div>
                      <div>{product.acea}</div>
                    </div>
                  </div>

                  {index !== productData.length - 1 && (
                    <div className="w-full h-[1px] border border-b border-gray-500"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {hasNoResults && (
          <div className="py-4 px-3 text-gray-100">
            <div className="text-base font-medium">Not found</div>
            <div className="text-sm opacity-90">Try different words or check spelling.</div>
          </div>
        )}

        {/* Footer link */}
        {searchQuery.length >= MIN_CHARS && (
          <Link
            href={`/search?s=${encodeURIComponent(searchQuery)}`}
            className="w-full block h-auto mt-5 py-1 text-base bg-slate-500 z-50 font-light tracking-wider text-center cursor-pointer first-letter:uppercase"
          >
            View More Search Results
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
