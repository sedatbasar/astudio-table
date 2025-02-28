import { AppDispatch, RootState } from "@/store/store";
import { setCurrentPage } from "@/store/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ArrowLeft from "@/assets/svgs/arrow-left.svg";
import ArrowRight from "@/assets/svgs/arrow-right.svg";

interface PropsType {
  totalItems: number;
}

const Pagination = ({ totalItems }: PropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { itemsPerPage, currentPage } = useSelector(
    (state: RootState) => state.table,
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  const generatePageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1, 2]; // Always include first two pages

    if (currentPage > 5) {
      pages.push("...");
    }

    // Dynamic Pages Around Current Page
    const start = Math.max(3, currentPage - 2);
    const end = Math.min(totalPages - 2, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages - 1, totalPages); // Always include last two pages

    return pages;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-grey"} rounded`}
      >
        <Image src={ArrowLeft} alt="Prev" width={20} height={20} />
      </button>
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          className={`px-3 rounded ${
            typeof page === "number"
              ? currentPage === page
                ? "font-bold self-start"
                : "py-1 hover:bg-grey cursor-pointer"
              : ""
          }`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-grey cursor-pointer"} rounded`}
      >
        <Image src={ArrowRight} alt="Next" width={20} height={20} />
      </button>
    </div>
  );
};

export default Pagination;
