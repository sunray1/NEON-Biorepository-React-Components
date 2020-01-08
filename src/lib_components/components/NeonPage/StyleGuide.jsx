/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import DocBlock from '../../../components/DocBlock';
import CodeBlock from '../../../components/CodeBlock';
import ExampleBlock from '../../../components/ExampleBlock';

import NeonPage from './NeonPage';
import Theme from '../Theme/Theme';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(3, 0),
  },
  example: {
    width: '100%',
    overflow: 'hidden',
    border: `1px dotted ${theme.palette.primary.main}`,
  },
}));

export default function StyleGuide(props) {
  const classes = useStyles(Theme);
  const { onClickHash } = props;

  const breadcrumbs = [
    { name: 'Breadcrumb 1', href: '/bc1' },
    { name: 'Breadcrumb 2', href: '/bc2' },
    { name: 'My Neon Page' },
  ];

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      let newProgress = progress + (Math.random() * 10);
      if (newProgress > 100) { newProgress = 0; }
      setProgress(newProgress);
    }, 200);
    return () => clearInterval(interval);
  });

  const skeletionGrid = (
    <Grid item xs={4}>
      <Skeleton variant="rect" width="100%" height={100} />
      <br />
      <Skeleton variant="rect" width="100%" height={16} />
      <br />
      <Skeleton variant="rect" width="60%" height={16} />
    </Grid>
  );

  return (
    <React.Fragment>

      <DocBlock>
        The standard component for generating a page on the Data Portal with
        a consistent header, footer, and page styles.
      </DocBlock>
      <DocBlock>
        NeonPage encapsulates the&nbsp;
        <Link href="#Theme" onClick={() => onClickHash('#Theme')}>NEON Material UI Theme</Link>,
        eliminating the need to put ThemeProvider and CssBaseline boilerplate in
        individual pages. It also affords props for universal page features like
        titles and breadcrumbs.
      </DocBlock>
      <CodeBlock>
        {`
import { NeonPage } from 'portal-core-components';
        `}
      </CodeBlock>

      <Typography variant="h5" component="h3" gutterBottom>Usage</Typography>

      <DocBlock>
        A NeonPage can be invoked with no props at all, containing only child
        node(s) for content.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage>
            <Typography>Content</Typography>
            <Typography>More content</Typography>
            <a href="#">Link (a tag)</a>
            <br />
            <Link href="#">Link (component)</Link>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
<NeonPage>
  <Typography>Content</Typography>
  <Typography>More content</Typography>
</NeonPage>
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Title</Typography>

      <DocBlock>
        Use the <tt>title</tt> prop to set a page title consistent with the
        common theme.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage title="My Neon Page">
            <Typography>Content</Typography>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
<NeonPage title="My Neon Page">
  <Typography>Content</Typography>
</NeonPage>
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Breadcrumbs</Typography>

      <DocBlock>
        Use the <tt>breadcrumbs</tt> prop to set a breadcrumbs nav element above
        the page title in a manner consistent with the common theme and other pages.
      </DocBlock>
      <DocBlock>
        This prop is defined as an array of objects, each containing
        a <tt>name</tt> string. All but the last element in the array also
        must contain an <tt>href</tt> string. Note that the initial <i>Home</i>
        breadcrumb link is automatically generated and does not need to be
        defined in <tt>breadcrumbs</tt>.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage title="My Neon Page" breadcrumbs={breadcrumbs}>
            <Typography>Content</Typography>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
const breadcrumbs = [
  { name: 'Breadcrumb 1', href: '/bc1' },
  { name: 'Breadcrumb 2', href: '/bc2' },
  { name: 'My Neon Page' },
];

export default function MyNeonPage() {
  return (
    <NeonPage title="My Neon Page" breadcrumbs={breadcrumbs}>
      <Typography>Content</Typography>
    </NeonPage>
  );
}
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Loading</Typography>

      <DocBlock>
        Use the <tt>loading</tt> prop to show a generic common full-page loading
        state with a custom message. Note this takes the place of the title element,
        so a defined <tt>title</tt> prop will not be shown. Children will also not
        be rendered while <tt>loading</tt> is defined. Breadcrumbs will be rendered,
        however, if defined.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage
            title="My Neon Page"
            breadcrumbs={breadcrumbs}
            loading="Loading My Neon Page..."
          >
            <Typography>Content</Typography>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
const breadcrumbs = [
  { name: 'Breadcrumb 1', href: '/bc1' },
  { name: 'Breadcrumb 2', href: '/bc2' },
  { name: 'My Neon Page' },
];

export default function MyNeonPage() {
  return (
    <NeonPage
      title="My Neon Page"
      breadcrumbs={breadcrumbs}
      loading="Loading My Neon Page..."
    >
      <Typography>Content</Typography>
    </NeonPage>
  );
}
        `}
      </CodeBlock>

      <DocBlock>
        A <tt>loading</tt> prop on its own will show an indeterminate spinner. If
        quantifiable progress is available it can also be fed to the page using
        the <tt>progress</tt> prop. This maps directly to the <tt>value</tt> prop
        on the Matrial UI CircularProgress component, and therefore should be a
        number ranging from 0 to 100.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage
            title="My Neon Page"
            breadcrumbs={breadcrumbs}
            loading="Loading My Neon Page..."
            progress={progress}
          >
            <Typography>Content</Typography>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
const breadcrumbs = [...];

// Simulate a progress value advancing in random steps from 0 to 100.
// Reset when surpassing 100.
const [progress, setProgress] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    let newProgress = progress + (Math.random() * 10);
    if (newProgress > 100) { newProgress = 0; }
    setProgress(newProgress);
  }, 200);
  return () => clearInterval(interval);
});

export default function MyNeonPage() {
  return (
    <NeonPage
      title="My Neon Page"
      breadcrumbs={breadcrumbs}
      loading="Loading My Neon Page..."
      progress={progress}
    >
      <Typography>Content</Typography>
    </NeonPage>
  );
}
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Error</Typography>

      <DocBlock>
        Use the <tt>error</tt> prop to show a generic common full-page error
        state with a custom message. Note this takes the place of the title element,
        so a defined <tt>title</tt> prop will not be shown. Children will also not
        be rendered while <tt>error</tt> is defined. Breadcrumbs will be rendered,
        however, if defined.
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example}>
          <NeonPage
            title="My Neon Page"
            breadcrumbs={breadcrumbs}
            error="Page failed to load"
          >
            <Typography>Content</Typography>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
const breadcrumbs = [
  { name: 'Breadcrumb 1', href: '/bc1' },
  { name: 'Breadcrumb 2', href: '/bc2' },
  { name: 'My Neon Page' },
];

export default function MyNeonPage() {
  return (
    <NeonPage
      title="My Neon Page"
      breadcrumbs={breadcrumbs}
      error="Page failed to load"
    >
      <Typography>Content</Typography>
    </NeonPage>
  );
}
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Loading With Skeletons</Typography>

      <DocBlock>
        The NeonPage is designed to show its content, whatever it is, regardless of
        the loading error state. One way to take advantage of this is to provide
        content composed of
        <Link href="https://material-ui.com/components/skeleton/">Material UI Skeletons</Link>
        until loaded. The example below shows what this might look like during a loading state.
      </DocBlock>
      <DocBlock>
        The title will automatically render as a skeleton if either the <tt>loading</tt> or
        <tt>error</tt> props are truthy and the <tt>title</tt> prop is falsey (i.e. not defined).
      </DocBlock>
      <ExampleBlock>
        <div className={classes.example} style={{ maxHeight: '600px', overflowY: 'scroll' }}>
          <NeonPage
            breadcrumbs={breadcrumbs}
            loading="Loading My Neon Page..."
          >
            <Grid container spacing={3}>
              {skeletionGrid}
              {skeletionGrid}
              {skeletionGrid}
            </Grid>
            <br />
            <br />
            <Grid container spacing={3}>
              {skeletionGrid}
              {skeletionGrid}
            </Grid>
          </NeonPage>
        </div>
      </ExampleBlock>
      <CodeBlock>
        {`
const breadcrumbs = [
  { name: 'Breadcrumb 1', href: '/bc1' },
  { name: 'Breadcrumb 2', href: '/bc2' },
  { name: 'My Neon Page' },
];

const skeletionGrid = (
  <Grid item xs={4}>
    <Skeleton variant="rect" width="100%" height={100} />
    <br />
    <Skeleton variant="rect" width="100%" height={16} />
    <br />
    <Skeleton variant="rect" width="60%" height={16} />
  </Grid>
);

export default function MyNeonPage() {
  return (
    <NeonPage
      breadcrumbs={breadcrumbs}
      loading="Loading My Neon Page..."
    >
      <Grid container spacing={3}>
        {skeletionGrid}
        {skeletionGrid}
        {skeletionGrid}
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}>
        {skeletionGrid}
        {skeletionGrid}
      </Grid>
    </NeonPage>
  );
}
        `}
      </CodeBlock>

    </React.Fragment>
  );
}

StyleGuide.propTypes = {
  onClickHash: PropTypes.func.isRequired,
};