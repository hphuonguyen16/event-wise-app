import moment from "moment";
export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function CheckStatus(eventDate) {
  const currentDate = new Date();
  const dateObject = moment(eventDate, "ddd MMM DD YYYY").toDate();
  const parsedEventDate = new Date(dateObject);

  if (parsedEventDate > currentDate) {
    return "On Sale";
  } else if (parsedEventDate.toDateString() === currentDate.toDateString()) {
    return "Upcoming";
  } else {
    return "Completed";
  }
}

export function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (event) =>
        event.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  if (filterStatus) {
    inputData = inputData.filter((event) => {
      if (filterStatus === "all") {
        return true;
      } else if (filterStatus === "onsale") {
        return CheckStatus(event.date) === "On Sale";
      } else if (filterStatus === "upcoming") {
        return CheckStatus(event.date) === "Upcoming";
      } else if (filterStatus === "completed") {
        return CheckStatus(event.date) === "Completed";
      }
      return true;
    });
  }

  return inputData;
}

//validate date in dayjs 2 date

//compare date in dayjs
