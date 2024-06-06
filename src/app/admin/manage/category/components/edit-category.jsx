import React, { useState } from "react";
import Rootmodal from "@/components/common/modals/RootModal";
import UrlConfig from "@/config/urlConfig";
import { TextField, Typography } from "@mui/material";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const EditCategory = ({ open, setOpen, fetchData, category }) => {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState(category.name);
  const handleCreate = async () => {
    const res = await axiosPrivate.put(
      UrlConfig.category.editCategory(category.id),
      {
        name,
      }
    );
    if (res.data.status === "success") {
      setOpen(false);
      fetchData();
    }
  };

  return (
    <div>
      <Rootmodal
        variant="Create"
        title="Edit Category"
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handleCreate()}
        width={500}
      >
        <TextField
          variant="outlined"
          label="Category Name"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </Rootmodal>
    </div>
  );
};

export default EditCategory;
