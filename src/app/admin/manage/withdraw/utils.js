import moment from "moment";
import dayjs from "dayjs";
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
  filterData,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  if (filterData.name) {
    inputData = inputData.filter(
      (item) =>
        item.user.profile.firstName
          .toLowerCase()
          .includes(filterData.name.toLowerCase()) ||
        item.user.profile.lastName
          .toLowerCase()
          .includes(filterData.name.toLowerCase()) ||
        item.user.profile.name
          .toLowerCase()
          .includes(filterData.name.toLowerCase()) ||
        item.user.organizer.profile.name
          .toLowerCase()
          .includes(filterData.name.toLowerCase()) ||
        item._id.toLowerCase().includes(filterData.name.toLowerCase())
    );
  }
  if (filterData.status) {
    if (filterData.status === "all") {
      inputData = inputData;
    } else {
      inputData = inputData.filter(
        (event) => event.transaction.status === filterData.status
      );
    }
  }

  if (filterData.startDate && filterData.endDate) {
    inputData = inputData.filter((event) => {
      const eventDate = dayjs(new Date(event.transaction.date));
      return (
        eventDate >= filterData.startDate && eventDate <= filterData.endDate
      );
    });
  }

  return inputData;
}
