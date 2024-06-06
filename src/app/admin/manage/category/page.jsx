"use client";

import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Iconify from "@/components/iconify";
import TableNoData from "./components/table-no-data";
import CategorieTableRow from "./components/categories-table-row";
import CategorieTableHead from "./components/categories-table-head";
import TableEmptyRows from "./components/table-empty-rows";
import CategorieTableToolbar from "./components/categories-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "./components/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatOnlyDate, formatTime } from "@/utils/DateConvert";
import AddNew from "./components/add-new";
import EditCategory from "./components/edit-category";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [categories, setCategories] = useState([]);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [item, setItem] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { setSnack } = useSnackbar();

  const handleSort = (categorie, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (categorie) => {
    if (categorie.target.checked) {
      const newSelecteds = categories.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (categorie, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (categorie, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (categorie) => {
    setPage(0);
    setRowsPerPage(parseInt(categorie.target.value, 10));
  };

  const handleFilterByName = (categorie) => {
    setPage(0);
    setFilterName(categorie.target.value);
  };

  const handleFilterStatus = (categorie) => {
    setPage(0);
    setFilterStatus(categorie.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: categories,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });
  const handleDeleteCategorie = (id) => {
    axiosPrivate
      .delete(UrlConfig?.category.deleteCategory(id))
      .then((res) => {
        fetchData();
        setSnack({
          open: true,
          message: "Categorie deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: "Categorie deleted failed!",
          type: "error",
        });
      });
  };

  function handleClickRow(id) {
    router.push(`/manage/categorie/${id}`);
  }

  const handleEditCategory = (categorie) => {
    setItem(categorie);
    setOpenEdit(true);
  };
  const notFound = !dataFiltered.length && !!filterName;

  const fetchData = async () => {
    await axiosPrivate.get(UrlConfig?.category.getAllCategories).then((res) => {
      const categories = res.data.data.data.map((categorie) => {
        return {
          id: categorie._id,
          name: categorie.name,
          createdAt: categorie.createdAt,
        };
      });
      setCategories(categories);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ px: 5 }}>
      <CustomSnackbar />
      {openAdd && (
        <AddNew open={openAdd} setOpen={setOpenAdd} fetchData={fetchData} />
      )}
      {openEdit && (
        <EditCategory
          open={openEdit}
          setOpen={setOpenEdit}
          fetchData={fetchData}
          category={item}
        />
      )}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h3">Categories</Typography>{" "}
        {/* Replace "/new-categorie-page" with the actual link */}
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenAdd(true)}
        >
          New Categorie
        </Button>
      </Stack>

      <Card>
        <CategorieTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />

        <TableContainer sx={{ overflow: "unset" }}>
          <Table sx={{ minWidth: 800 }}>
            <CategorieTableHead
              order={order}
              orderBy={orderBy}
              rowCount={categories.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: "name", label: "Name" },
                { id: "createdAt", label: "Created At" },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <CategorieTableRow
                    key={row.id}
                    name={row.name}
                    createdAt={formatOnlyDate(row.createdAt)}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(categorie) => handleClick(categorie, row.id)}
                    handleClickRow={() => handleClickRow(row.id)}
                    handleEditCategory={() => handleEditCategory(row)}
                    handleDeleteCategorie={(categorie) =>
                      handleDeleteCategorie(row.id)
                    }
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, categories.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
