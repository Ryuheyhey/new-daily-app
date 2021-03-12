import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
  label: string
  onClick?: (e) => void
}

const useStyles = makeStyles({
  "button": {
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256
  }
})

const PrimaryButton = (props: Props) => {
  const classes = useStyles()

  return (
    <Button 
      variant="contained"   
      className={classes.button}
      onClick={props.onClick}
      >
        {props.label}
    </Button>
  )
}

export default PrimaryButton