import React, { useCallback, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: 200,
      // flex: 1
    },
    button: {
      flex: 2,
    }
  }),
);

export default function DatePickers() {
  const classes = useStyles();

  const [date, setDate] = useState("")

  const handleChenge = useCallback((e) => {
    setDate(e.target.value)
  },[setDate])
  
  console.log(date)

  const handleKeyPress = (e) => {
    if(e.key == 'Enter') {
      e.preventDefault()
      Router.push('/daily/[date]', `/daily/${date}`)
    }
  }


  return (
    <div>
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="日付検索"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChenge}
        onKeyPress={handleKeyPress}
      />
      <ListItemSecondaryAction className={classes.button}>
        <IconButton edge="end" onClick={() => Router.push('/daily/[date]', `/daily/${date}`)}>
          <SearchIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </form>
    
    </div>
  );
}