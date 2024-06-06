import React, { useState } from "react";
import Rootmodal from "@/components/common/modals/RootModal";
import UrlConfig from "@/config/urlConfig";
import { TextField, Typography } from "@mui/material";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const AddNew = ({ open, setOpen, fetchData }) => {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const handleCreate = async () => {
    const res = await axiosPrivate.post(UrlConfig.category.createCategory, {
      name,
    });

    if (res.data.status === "success") {
      setOpen(false);
      fetchData();
    }
  };

  return (
    <div>
      <Rootmodal
        variant="Create"
        title="Create New Category"
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handleCreate()}
        width={500}
      >
        <TextField
          variant="outlined"
          label="Category Name"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </Rootmodal>
    </div>
  );
};

export default AddNew;
