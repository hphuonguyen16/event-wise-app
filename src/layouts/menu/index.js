import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";

export const menuOrganizer = [
  {
    link: "/home",
    name: "Home",
    icon: (
      <DashboardOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/manage/event",
    name: "Event",
    icon: (
      <DateRangeOutlinedIcon
        sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/manage/order",
    name: "Order",
    icon: (
      <AssignmentOutlinedIcon
        sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/organization",
    name: "Organization Setting",
    icon: (
      <SettingsOutlinedIcon
        sx={{ fontSize: "30px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
];

export const menuAdmin = [
  {
    link: "/admin/manage/category",
    name: "Category",
    icon: (
      <BackupTableOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/admin/manage/transaction",
    name: "Transaction",
    icon: (
      <ReceiptOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/admin/manage/withdraw",
    name: "Withdraw",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/admin/manage/user",
    name: "User",
    icon: (
      <AccountCircleOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/admin/manage/event",
    name: "Event",
    icon: (
      <CelebrationOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
];

export const menuUser = [
  {
    link: "/home",
    name: "Home",
    icon: (
      <DashboardOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/me/manage-order",
    name: "My orders",
    icon: (
      <AssignmentOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
  {
    link: "/me/withdraw",
    name: "Withdraw",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        sx={{ fontSize: "32px", stroke: "#ffffff", strokeWidth: 1 }}
      />
    ),
  },
];
