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
import SiteMap from '../lib_components/components/SiteMap/SiteMap';

const CLIENT_ROOT = 'http://localhost/neon';

const useStyles = makeStyles((theme) => ({
  heroTitle: {
    width: '100%',
    maxWidth: '1204px',
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1,
    width: '50%',
    height: '63%',
    color: '#fff',
  },
  lightBrownDiv: {
    backgroundColor: '#4B372E',
    height: '65%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '5%',
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundImage: 'url(neon-react/biorepo_lib/hero-edge-lb.png)',
      top: 0,
      left: 'auto',
      right: '-30px',
      height: '65%',
      width: '30px',
    },
  },
  darkBrownDiv: {
    backgroundColor: '#352723',
    height: '35%',
    width: '100%',
    display: 'flex',
    paddingLeft: '5%',
    alignItems: 'center',
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundImage: 'url(neon-react/biorepo_lib/hero-edge-db.png)',
      left: 'auto',
      right: '-30px',
      height: '35%',
      width: '30px',
    },
  },
  blueDiv: {
    position: 'relative',
    backgroundColor: '#002C77',
    color: '#fff',
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
  alert: {
    marginTop: '3em',
    borderBottomWidth: '2px',
    borderColor: '#F0AB00',
    borderLeftWidth: '20px',
    borderRightWidth: '2px',
    borderStyle: 'solid',
    borderTopWidth: '2px',
    padding: '10px',
  },
}));

export default function BiorepoHomePageContent() {
  const classes = useStyles(Theme);

  return (
    <>
      <div id="hero-title" className={classes.heroTitle}>
        <div id="hero-image" className={classes.heroImage}>
          <img
            src="images/home-card-images/IMG_9525.jpg"
            width="1204"
            height="500"
            alt="Fluid Preserved Samples at the NEON Biorepository"
            loading="lazy"
          />
        </div>
        <div id="hero-content" className={classes.heroContent}>
          <div id="content-title" className={classes.lightBrownDiv}>
            <Typography variant="h3" color="white" component="h3">
              NEON Biorepository Sample Portal at ASU
            </Typography>
            <Typography variant="h6" color="white" component="h6">
              Something here about what the site serves
            </Typography>
          </div>
          <div id="content-sub" className={classes.darkBrownDiv}>
            <div style={{ marginRight: '12px' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="3" fill="#fff">
                </rect>
                <path d="M30 24l-12-8v16l12-8z" fill="#0073CF" stroke="#0073CF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <div>
              <p style={{
                fontFamily: '"Inter",sans-serif',
                lineHeight: '1.6',
                fontWeight: 'bold',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C2DEEA',
                fontSize: '0.8125rem',
                marginTop: 0,
                marginBottom: 0,
              }}
              >
                Watch
              </p>
              <p style={{
                fontFamily: '"Inter",sans-serif',
                lineHeight: '1.25',
                fontSize: '1.5rem',
                marginTop: 0,
                marginBottom: 0,
              }}
              >
                <a href="https://www.youtube.com/watch?v=-gHqSPJOETQ" style={{ color: '#fff' }}>
                  A Tour of NEON&apos;s Biorepository
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.alert}>
        <p>
          A new
          {' '}
          <a href="https://www.nsf.gov/pubs/2024/nsf24069/nsf24069.jsp">
            NSF DCL
            {' '}
            presents an opportunity to leverage the NEON Biorepository collections
          </a>
          . Please
          {' '}
          <a href="mailto:biorepo@asu.edu">
            contact us
          </a>
          {' '}
          with any questions or for information needed for
          {' '}
          potential innovative use! We are here to support you.
        </p>
      </div>
      <div id="callout-cards" style={{ marginTop: '3em' }}>
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
                <Typography component="h1">
                  Sample Handling
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Sample processes, types & collections
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/misc/samplehandling.php`}>
                  Explore Sample Processes
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
                <Typography component="h1">
                  Search for Samples
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/neon/search/index.php`}>
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
                <Typography component="h1">
                  Sample Services
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Request Samples and Request Storage
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/misc/sampleservices.php`}>
                  Request Services
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
                <Typography component="h1">
                  Guidelines & Policies
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/misc/sampleguidelines.php`}>
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
                <Typography component="h1">
                  Species Checklists
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lorem ipsum blahblahblah
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/projects/index.php`}>
                  Browse Checklists
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
                <Typography component="h1">
                  Sample Analysis
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  API and Sample Explorer
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/misc/sampleanalysis.php`}>
                  Work with Samples
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
      <div id="site-map" style={{ marginTop: '10em' }}>
        <Typography variant="h4" component="h4" style={{ marginBottom: '1em' }}>
          Explore Samples by Location
        </Typography>
        <SiteMap view="split" />
      </div>
    </>
  );
}
