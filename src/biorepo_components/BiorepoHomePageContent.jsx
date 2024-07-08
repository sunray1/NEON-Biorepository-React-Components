import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBug, faDatabase, faImage, faCalendarDays, faFlask, faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RightIcon from '@material-ui/icons/ChevronRight';

import Theme from '../lib_components/components/Theme/Theme';

const useStyles = makeStyles((theme) => ({
  blueDiv: {
    position: 'relative',
    backgroundColor: '#002C77',
    color: '#fff !important',
    marginTop: '10em',
    right: '74px',
    '&::before': {
      content: '""',
      position: 'absolute',
      backgroundImage: 'url(neon-react/biorepo_lib/blue_border.png)',
      backgroundPosition: '50% 0',
      backgroundRepeat: 'repeat no-repeat',
      top: '-60px',
      height: '60px',
      width: '100%',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundImage: 'url(neon-react/biorepo_lib/blue_border.png)',
      backgroundPosition: '50% 0',
      backgroundRepeat: 'repeat no-repeat',
      transform: 'rotate(180deg)',
      '-webkit-transform': 'rotate(180deg)',
      '-ms-transform': 'rotate(180deg)',
      bottom: '-60px',
      height: '60px',
      width: '100%',
    },
  },
  faIcon: {
    color: '#ffffff',
    fontSize: '5rem',
  },
  statistics: {
    textAlign: 'center',
  },
}));

export default function BiorepoHomePageContent() {
  const classes = useStyles(Theme);

  return (
    <>
      <div id="callout-cards">
        <Grid container spacing={7}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/20210913NEONBioRepository_057.jpg"
                title="Sample Types"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Sample Types
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="https://biorepo.neonscience.org/portal/collections/misc/collprofiles.php">
                  Browse Sample Types
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/20210913NEONBioRepository_165.jpg"
                title="Sample Search"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Search for Samples
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="https://biorepo.neonscience.org/portal/neon/search/index.php">
                  Search Samples
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/20210913NEONBioRepository_088.jpg"
                title="Request Samples"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Request Samples
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="https://biorepo.neonscience.org/portal/misc/samplerequest.php">
                  Request Samples
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/IMG_9517.jpg"
                title="Guidelines & Policies"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Guidelines & Policies
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="https://biorepo.neonscience.org/portal/misc/samplepolicy.php">
                  Read Guidelines
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/IMG_9534.jpg"
                title="Contact Biorepository"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Contact Biorepository
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="#">
                  Contact Us
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image="images/home-card-images/20210913NEONBioRepository_244.jpg"
                title="Something Else"
                height="auto"
                loading="lazy"
              />
              <CardContent>
                <Typography component="h2">
                  Something Else
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href="#">
                  Something Else
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div id="blue-div" className={classes.blueDiv}>
        <div id="statistics-container" style={{ position: 'relative', left: '74px' }}>
          <Typography variant="h3" color="white" component="h3">
            Statistics
          </Typography>
          <Grid id="statistics" container spacing={0.5} justifyContent="center" className={classes.statistics}>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faBug} className={classes.faIcon} />
              <Typography id="speciesCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faDatabase} className={classes.faIcon} />
              <Typography id="recordCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faImage} className={classes.faIcon} />
              <Typography id="imageCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faCalendarDays} className={classes.faIcon} />
              <Typography id="yearCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faFlask} className={classes.faIcon} />
              <Typography id="sampleTypeCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FontAwesomeIcon icon={faEarthAmericas} className={classes.faIcon} />
              <Typography id="siteCount" variant="h6" color="white" component="h6">
                0
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
