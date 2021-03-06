import { Pagination } from "antd";

const PaginationA = (props) => {
  const {
    totalPages,
    currentPage,
    setCurrentPage,
    totalResults,
    type,
    searchedQuery,
  } = props;

  //console.log(totalPages);
  return (
    <div className='paginationCenter'>
      {totalPages > 0 && type === "simple" && (
        <Pagination
          current={currentPage}
          pageSize={20}
          onChange={(page, pageSize) => setCurrentPage(page)}
          total={totalResults}
          simple
        />
      )}
      {totalPages > 0 && type === "full" && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalResults}
          showSizeChanger={false}
          showLessItems
          pageSize={20}
          showTotal={(total) =>
            `Total ${total} items found for '${searchedQuery}'`
          }
          onChange={(page, pageSize) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default PaginationA;
