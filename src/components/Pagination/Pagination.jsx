import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { PaginationButton, PaginationContainer } from "./Pagination.styled";

function Pagination({ navigation, totalPages, options = {} }) {
  const { page: currentPage = 1 } = useLocation().state || {};

  const pageButtons = [];
  for (let page = 1; page <= totalPages; page += 1) {
    pageButtons.push(
      <PaginationButton
        key={page}
        to={navigation}
        state={{ page, ...options }}
        active={page === currentPage ? 1 : undefined}
      >
        {page}
      </PaginationButton>
    );
  }

  return (
    <PaginationContainer>
      <PaginationButton to={navigation} state={{ page: 1, ...options }}>
        {"<<"}
      </PaginationButton>
      <PaginationButton
        to={navigation}
        state={{
          page: currentPage > 1 ? currentPage - 1 : currentPage,
          ...options,
        }}
      >
        {"<"}
      </PaginationButton>
      {pageButtons}
      <PaginationButton
        to={navigation}
        state={{
          page: currentPage < totalPages ? currentPage + 1 : currentPage,
          ...options,
        }}
      >
        {">"}
      </PaginationButton>
      <PaginationButton
        to={navigation}
        state={{ page: totalPages, ...options }}
      >
        {">>"}
      </PaginationButton>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  navigation: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  options: PropTypes.shape(),
};

Pagination.defaultProps = {
  options: {},
};

export default Pagination;
