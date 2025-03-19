import React from 'react';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import RightIcon from '@material-ui/icons/ChevronRight';

export default function BiorepoGuidelinesContent() {
  return (
    <div id="callout-cards">
      <Grid container spacing={7}>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">
                Sample Use Policy
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '1rem' }}>
                Learn more about the policies that govern the use of NEON samples and specimens.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" endIcon={<RightIcon />} href="samplepolicy.php" style={{ color: '#0073CF', borderColor: '#0073CF' }}>
                Read the Policies
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">
                Acknowledging and Citing the Biorepository
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '1rem' }}>
                Have you used any specimens or samples from the NEON Biorepository? Learn how to best cite and acknowledge NEON in your publications, presentations, or other outputs.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" endIcon={<RightIcon />} href="cite.php" style={{ color: '#0073CF', borderColor: '#0073CF' }}>
                Cite Us
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">
                Publishing Research Outputs
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{ fontSize: '1rem' }}>
                Here are some best practices for maximizing credit for your research by highlighting sample-associated publications and publishing your sample-associated data.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" size="large" endIcon={<RightIcon />} href="datasetpublishing.php" style={{ color: '#0073CF', borderColor: '#0073CF' }}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
