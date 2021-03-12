import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useCallback } from 'react';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    background: theme.palette.primary.main,
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    
  }
}))



const EditIconButton = () => {
  const classes = useStyles()

  const goToAdd = useCallback(() => {
    Router.push("/daily/add")
  },[])

  return (
    <IconButton className={classes.button} onClick={goToAdd}>
      <EditIcon fontSize="large"/>
    </IconButton>
  )
}

export default EditIconButton
