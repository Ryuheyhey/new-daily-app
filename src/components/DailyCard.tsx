import React, { useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/Home.module.css";
import { createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Router from "next/router";
import { CardButton } from "../components";

type Props = {
  cardTitle: string;
  day: string;
  title: string;
  weekday: string;
  id: string;
  goToDetail: (id: string) => void;
  goToEdit: (id: string) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      margin: "0 0 1rem 0",
      height: 136,
      alignItems: "center",
    },
    title: {
      fontSize: "1.6rem",
      lineHeight: 1.8,
      [theme.breakpoints.down('sm')]: {
        // fontSize: "10px",
        // marginBottom: "20px"
        display: "none"
      }
    },
    context: {
      opacity: 0.7,
      [theme.breakpoints.down('sm')]: {
        fontSize: "10px"
      }
    },
    button: {
      opacity: 0.7,
      margin: "0 16px 0 auto",
    },
    daily: {
      color: theme.palette.primary.main,
      textAlign: "center",
      margin: "0 16px 0 16px",
    },
    day: {
      fontSize: "1.4rem",
    },
    date: {
      fontSize: "3.8rem",
      fontWeight: "bold",
      height: 64,
      lineHeight: 1,
    },
  })
);

const DailyCard = (props: Props) => {
  const classes = useStyles();

  console.log(props);

  return (
    <Card className={classes.content} variant="outlined">
      <CardContent className={classes.daily}>
        <Typography className={classes.day}>{props.weekday}</Typography>
        <Typography className={classes.date}>{props.day}</Typography>
      </CardContent>
      <CardContent>
        <Typography className={classes.title}>{props.cardTitle}</Typography>
        <Typography className={classes.context}>{props.title}</Typography>
      </CardContent>
      <CardActions className={classes.button}>
        <div>
          <div>
            <CardButton
              variant={"contained"}
              onClick={props.goToDetail}
              style={{ marginBottom: 10 }}
              label={"詳細"}
            />
          </div>
          <div>
            <CardButton
              variant={"outlined"}
              onClick={props.goToEdit}
              label={"編集"}
            />
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default DailyCard;
