import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

export default function TooltipsComponent({ children, title }) {
  return (
    <Tooltip title={title} arrow>
      {children}
    </Tooltip>
  );
}
