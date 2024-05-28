import React, {
  useState,
  useEffect,
} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Theme from '../lib_components/components/Theme/Theme';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3, 0),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(4),
    '& > :not(:last-child)': {
      marginRight: theme.spacing(4),
    },
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > :not(:last-child)': {
      marginRight: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
  },
  typographyContainer: {
    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },
}));

export default function App() {
  const classes = useStyles(Theme);

  return (
    <div className={classes.row}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Callout
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            The styleguide refers to it as a Callout; Material UI uses Card. Same thing.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">
            Share
          </Button>
          <Button variant="outlined">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
