import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useCallback } from "react";
import Router from "next/router";

type Props = {
  onClick: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.palette.primary.main,
      position: "fixed",
      right: "1rem",
      bottom: "1rem",
    },
  })
);

const EditIconButton = (props: Props) => {
  const classes = useStyles();

  const goToAdd = useCallback(() => {
    Router.push("/daily/add");
  }, []);

  return (
    <IconButton className={classes.button} onClick={props.onClick}>
      <EditIcon fontSize="large" />
    </IconButton>
  );
};

export default EditIconButton;
