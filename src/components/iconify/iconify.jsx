import Box from "@mui/material/Box";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const Iconify = forwardRef(function Iconify(
  { icon, width = 20, sx, ...other },
  ref
) {
  return (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  );
});

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

Iconify.displayName = "Iconify"; // <-- Add this line

export default Iconify;
