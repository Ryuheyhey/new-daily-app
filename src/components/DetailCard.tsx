import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type Props = {
  content: string
}

const useStyles = makeStyles({
  root: {
    height: 136,
    position: "relative"
  },
  button: {
    position: "absolute",
    left: "8px",
    bottom: "8px",
    opacity: 0.5,

  },
});

const DetailCard = (props: Props) => {
  const classes = useStyles()

 return (
  <Card className={classes.root} variant="outlined">
  <CardContent>
    <Typography>
      {props.content}
    </Typography>
  </CardContent>
</Card>
 )
}

export default DetailCard