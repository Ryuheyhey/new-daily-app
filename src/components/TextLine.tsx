import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FC } from "react";
import theme from "../theme";

type Props = {
  text: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: {
      color: "",
      background: theme.palette.grey[500],
      lineHeight: 1.6,
      paddingLeft: "1rem",
    },
  })
);

const TexrtLine = (props: Props) => {
  const classes = useStyles();

  return <div className={classes.line}>{props.text}</div>;
};

export default TexrtLine;
