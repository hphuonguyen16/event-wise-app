import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Typography, Button } from "@mui/material";
const bankName = [
  {
    label: "Vietcombank",
    name: "Vietcombank",
  },
  {
    label: "Vietinbank",
    name: "Vietinbank",
  },
  {
    label: "BIDV",
    name: "BIDV",
  },
  {
    label: "Techcombank",
    name: "Techcombank",
  },
  {
    label: "MBBank",
    name: "MBBank",
  },
  {
    label: "Agribank",
    name: "Agribank",
  },
  {
    label: "VPBank",
    name: "VPBank",
  },
  {
    label: "Sacombank",
    name: "Sacombank",
  },
  {
    label: "DongA Bank",
    name: "DongA Bank",
  },
  {
    label: "ACB",
    name: "ACB",
  },
  {
    label: "HDBank",
    name: "HDBank",
  },
  {
    label: "TPBank",
    name: "TPBank",
  },
  {
    label: "Oceanbank",
    name: "Oceanbank",
  },
  {
    label: "SHB",
    name: "SHB",
  },
  {
    label: "Eximbank",
    name: "Eximbank",
  },
  {
    label: "VIB",
    name: "VIB",
  },
  {
    label: "MSB",
    name: "MSB",
  },
  {
    label: "NCB",
    name: "NCB",
  },
  {
    label: "PG Bank",
    name: "PG Bank",
  },
  {
    label: "BacABank",
    name: "BacABank",
  },
  {
    label: "LienVietPostBank",
    name: "LienVietPostBank",
  },
  {
    label: "SeABank",
    name: "SeABank",
  },
  {
    label: "NamABank",
    name: "NamABank",
  },
  {
    label: "VietCapitalBank",
    name: "VietCapitalBank",
  },
  {
    label: "VietBank",
    name: "VietBank",
  },
  {
    label: "BaoVietBank",
    name: "BaoVietBank",
  },
  {
    label: "KienLongBank",
    name: "KienLongBank",
  },
  {
    label: "VietABank",
    name: "VietABank",
  },
];

const WithdrawMethod = () => {
  const isMobile = false;
  const [isLoading, setIsLoading] = useState(true);
  const widthAuto = isMobile ? "100%" : "600px";
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    number: "",
    owner_name: "",
    bank_name: "",
  });
  const fetchData = async () => {
    // fetch data
  };
  const updateData = async () => {
    if (data.number === "" || data.owner_name === "" || data.bank_name === "") {
      setSnack({
        ...snack,
        open: true,
        message: t("pleaseFillOutAllFields"),
        type: "error",
      });
      return;
    }
    setIsSubmit(true);
    // update data
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Typography variant="h4" sx={{ my: 2 }}>
        Thông tin tài khoản rút tiền
      </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bankName}
        defaultValue={data.bank_name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ngân hàng"
            sx={{ width: widthAuto, marginTop: 2 }}
          />
        )}
        onChange={(e, value) => setData({ ...data, bank_name: value.name })}
      />
      <div>
        <TextField
          id="outlined-basic"
          label="Chủ tài khoản"
          variant="outlined"
          defaultValue={data.owner_name}
          sx={{ width: widthAuto, marginTop: 2 }}
          helperText="Vui lòng viết hoa"
          onChange={(e) => setData({ ...data, owner_name: e.target.value })}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          type="number"
          label="Số tài khoản"
          variant="outlined"
          defaultValue={data.number}
          sx={{ width: widthAuto, marginTop: 2 }}
          onChange={(e) => setData({ ...data, number: e.target.value })}
        />
      </div>
      <Button
        variant="contained"
        sx={{ marginTop: 2, width: widthAuto }}
        onClick={() => updateData()}
      >
        Cập nhật
      </Button>
    </div>
  );
};

export default WithdrawMethod;
