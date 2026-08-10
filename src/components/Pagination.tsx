interface PaginationProps {
  currentPage: number;
  totalPages: number;
  movePagePrev: () => void;
  movePageNext: () => void
}

export default function Pagination({ currentPage, totalPages, movePagePrev, movePageNext }: PaginationProps) {
  return (
    <div className="pagination justify-between">
      <button
        type="button"
        onClick={movePagePrev}
        id="pagination-prev"
        className="pagination-btn"
        aria-label="Previous page"
        disabled={currentPage <= 1}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <span className="pagination-label">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={movePageNext}
        id="pagination-next"
        className="pagination-btn"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
