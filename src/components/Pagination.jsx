const Pagination = ({ page, setPage, total }) => {
  return (
    <div className="flex items-center gap-4 justify-center my-8">
      <button
        disabled={page === 1}
        onClick={() => setPage(p => p - 1)}
        className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100"
      >
        Prev
      </button>

      <span className="font-medium">
        Page {page} of {total}
      </span>

      <button
        disabled={page === total}
        onClick={() => setPage(p => p + 1)}
        className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

