import React, {
  useState,
  useEffect,
} from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import RightIcon from '@material-ui/icons/ChevronRight';

import Theme from '../lib_components/components/Theme/Theme';

export default function BiorepoHomePageContent() {

  return (
    <Grid container rowSpacing={8} columnSpacing={4}>
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
            <Typography variant="h5" component="h2">
              Sample Types
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum blahblahblah
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
            <Typography variant="h5" component="h2">
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
            <Typography variant="h5" component="h2">
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
            <Typography variant="h5" component="h2">
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
            <Typography variant="h5" component="h2">
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
            <Typography variant="h5" component="h2">
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
  );
}
