import { useState, useEffect } from "react";
import BPagination from "react-bootstrap/Pagination";
import { Row } from "react-bootstrap";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

function Pagination({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
  id,
}) {
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit));
    setCurrentPage(1);
  }, [id, data.length, dataLimit]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pages <= pageLimit ? pages : pageLimit)
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <h2 className="text-primary text-center h3">{title}</h2>

      <div className="mt-5" dir="rtl">
        <Row>
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </Row>
      </div>

      <BPagination className="justify-content-center mt-4">
        {/* previous button */}
        <BPagination.Item
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <MdKeyboardArrowRight />
        </BPagination.Item>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <BPagination.Item
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item
                ? "active"
                : Math.ceil(data.length / dataLimit) < item
                ? "disabled"
                : null
            }`}
          >
            <span>{item}</span>
          </BPagination.Item>
        ))}

        {/* next button */}
        <BPagination.Item
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <MdKeyboardArrowLeft />
        </BPagination.Item>
      </BPagination>
    </div>
  );
}

export default Pagination;
