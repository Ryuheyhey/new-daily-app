import React, { Component, FC, useState } from "react";
import Link from "next/link";
import SearchDay from "./SearchDay";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { Divider } from "@material-ui/core";
import styles from "../styles/Home.module.css";

type Props = {
  title: string;
  link?: string;
};
type Menus = { title: string; link: string }[];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    root: {
      flexGrow: 1,
    },
    menu: {
      padding: 0,
    },
  })
);

const Header = (props: Props) => {
  const classes = useStyles();

  const [state, setState] = useState<any>({
    left: false,
  });

  const toggleDrawer = (side, open) => () => {
    setState({
      [side]: open,
    });
  };

  const menus: Menus = [
    { title: "進歩チェックリスト", link: "/" },
    { title: "陸上日誌", link: "/run" },
  ];

  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem>
          <SearchDay />
        </ListItem>
        <Divider />
        {menus.map((menu, index) => {
          return (
            <Link href={menu.link} key={index}>
              <a>
                <ListItem>
                  <ListItemText primary={menu.title} />
                </ListItem>
                <Divider />
              </a>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <IconButton aria-label="Menu" onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
          <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
            <div tabIndex={0} role="button">
              {sideList}
            </div>
          </Drawer>
          <strong className={styles.title}>
            <Link href={props.link}>
              <a>
                <span>{props.title}</span>
              </a>
            </Link>
          </strong>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
