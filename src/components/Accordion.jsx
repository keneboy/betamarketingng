import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions({ dataControl }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {dataControl?.map((item, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            className="sam_accordion"
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                Direct Bank Transfer
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="accordion_details_mxm">
                <ul>
                  <li>
                    {" "}
                    <p className="dot"></p> Chart Large
                  </li>
                  <li>
                    <p className="dot"></p> Chart medium
                  </li>
                  <li>
                    {" "}
                    <p className="dot"></p> Chart small
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
