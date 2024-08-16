"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const PaginationArrow = ({ direction, page, isDisabled }) => {
  const router = useRouter();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-5 cursor-not-allowed" : "";

  const handleClick = () => {
    if (!isDisabled) {
     // router.push(page);
     router.replace(page, undefined, { shallow: true, scroll: false });
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-transparent p-2 text-gray-100 hover:bg-gray-700 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? <FaChevronLeft size={20}  /> : <FaChevronRight size={20}  /> }
    </Button>
  );
};

export function PaginationComponent({ pageCount, totalPage, pageSize=12 }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="mt-10 pt-10"  >
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            page={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-8 font-normal tracking-widest text-gray-500">Page {currentPage} / {Math.ceil(totalPage / pageSize)}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            page={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
