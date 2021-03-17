import React, { useCallback, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Router, { useRouter } from "next/router";
import { Satellite } from "@material-ui/icons";

const moment = require("moment");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: 200,
      // flex: 1
    },
    button: {
      flex: 2,
    },
  })
);

export default function DatePickers() {
  const classes = useStyles();

  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  const category = router.pathname.split("/")[1];
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    switch (category) {
      case "":
        setValue("進歩チェックリスト");
        break;
      case "daily":
        setValue("進歩チェックリスト");
        break;
      case "run":
        setValue("陸上日誌");
        break;
    }
  }, []);

  console.log(category);
  console.log(value);

  const handleDate = useCallback(
    (e) => {
      setDate(e.target.value);
    },
    [setDate]
  );

  console.log(date);

  const handleClick = () => {
    switch (category) {
      case "":
        Router.push("/daily/[date]", `/daily/${date}`);
        break;
      case "daily":
        Router.push("/daily/[date]", `/daily/${date}`);
        break;
      case "run":
        Router.push("/run/[date]", `/run/${date}`);
        break;
      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      switch (category) {
        case "":
          Router.push("/daily/[date]", `/daily/${date}`);
          break;
        case "daily":
          Router.push("/daily/[date]", `/daily/${date}`);
          break;
        case "run":
          Router.push("/run/[date]", `/run/${date}`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <form noValidate>
        <div className={classes.container}>
          <TextField
            id="date"
            label={`日付検索 (${value})`}
            type="date"
            defaultValue={today}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDate}
            onKeyPress={handleKeyPress}
          />
          <ListItemSecondaryAction className={classes.button}>
            <IconButton edge="end" onClick={handleClick}>
              <SearchIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </div>
      </form>
    </div>
  );
}
