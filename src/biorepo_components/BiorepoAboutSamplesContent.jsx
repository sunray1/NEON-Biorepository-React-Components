import React from 'react';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import RightIcon from '@material-ui/icons/ChevronRight';

const CLIENT_ROOT = 'https://biokic4.rc.asu.edu/neon/portal';
// const CLIENT_ROOT = 'http://localhost/neon';

export default function BiorepoAboutSamplesContent() {
  return (
    <div id="callout-cards">
      <Grid container spacing={7}>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              image="../images/card-images/IMG_9530.jpg"
              title="Repositories"
              height="auto"
              loading="lazy"
            />
            <CardContent>
              <Typography variant="h5">
                Sample Repositories
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '1rem' }}>
                Although the NEON Biorepository is the primary facility housing NEON samples, select specimens are held by other institutions. Requests for these samples should be made directly to the hosting organization.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" endIcon={<RightIcon />} href="https://www.neonscience.org/samples/sample-repositories">
                List Repositories
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              image="../images/card-images/IMG_9506.jpg"
              title="Collections"
              height="auto"
              loading="lazy"
            />
            <CardContent>
              <Typography variant="h5">
                Sample Collection Profiles
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '1rem' }}>
                NEON samples in the sample portal are organized into collections. These generally correspond to the types of samples collected. Data and statistics about these collections can be found here.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" endIcon={<RightIcon />} href={`${CLIENT_ROOT}/misc/collprofiles.php`}>
                Explore Samples Types
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
