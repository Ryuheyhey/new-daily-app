import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  defaultValue?: string;
  multiline: boolean;
  rows: number;
  fullWidth: boolean;
  onChange?: (e) => void;
  value?: string;
};

const useStyles = makeStyles({
  root: {
    margin: "1rem",
  },
});

const DailyText = (props: Props) => {
  const classes = useStyles();

  return (
    <TextField
      label={props.label}
      defaultValue={props.defaultValue}
      multiline={props.multiline}
      rows={props.rows}
      fullWidth={props.fullWidth}
      onChange={props.onChange}
      variant="outlined"
      color="primary"
    />
  );
};

export default DailyText;
