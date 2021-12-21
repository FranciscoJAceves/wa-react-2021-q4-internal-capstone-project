import PropTypes from "prop-types";
import { AccentRow, TableContainer } from "./Table.styled";

function Table({ header, content }) {
  const headerCells = (
    <tr>
      {header.map((name) => (
        <th key={name}>{name}</th>
      ))}
    </tr>
  );

  const rows = content.map(({ rowID, cellIDs, data }, rowIndex) => {
    const cells = data.map((value, cellIndex) => (
      <td key={cellIDs[cellIndex]}>{value}</td>
    ));
    return rowIndex % 2 === 0 ? (
      <tr key={rowID}>{cells}</tr>
    ) : (
      <AccentRow key={rowID}>{cells}</AccentRow>
    );
  });

  return (
    <TableContainer>
      {header.length > 0 && <thead>{headerCells}</thead>}
      <tbody>{rows}</tbody>
    </TableContainer>
  );
}

Table.propTypes = {
  header: PropTypes.arrayOf(PropTypes.node),
  content: PropTypes.arrayOf(
    PropTypes.shape({
      rowId: PropTypes.string,
      cellIDs: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.arrayOf(PropTypes.node),
    })
  ).isRequired,
};

Table.defaultProps = {
  header: [],
};

export default Table;
