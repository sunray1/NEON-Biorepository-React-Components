import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';

import ErrorIcon from '@material-ui/icons/Error';
import SummaryIcon from '@material-ui/icons/Toc';
import SitesIcon from '@material-ui/icons/Place';
import DateRangeIcon from '@material-ui/icons/DateRange';
import VariablesIcon from '@material-ui/icons/Timeline';
import AxesIcon from '@material-ui/icons/BorderInner';

import NeonEnvironment from '../NeonEnvironment/NeonEnvironment';
import Theme from '../Theme/Theme';

import TimeSeriesViewerContext, {
  summarizeTimeSteps,
  TIME_SERIES_VIEWER_STATUS,
  TIME_SERIES_VIEWER_STATUS_TITLES,
} from './TimeSeriesViewerContext';
import TimeSeriesViewerSites from './TimeSeriesViewerSites';
import TimeSeriesViewerDateRange from './TimeSeriesViewerDateRange';
import TimeSeriesViewerVariables from './TimeSeriesViewerVariables';
import TimeSeriesViewerAxes from './TimeSeriesViewerAxes';
import TimeSeriesViewerGraph from './TimeSeriesViewerGraph';

// We can't rely on flex-sizing to work during resize events as some components within tabs
// won't be able to shrink correctly on resize (notably: Data Product Availability charts).
const VERTICAL_TABS_WIDTH = 150;
const useStyles = makeStyles(theme => ({
  tabsContainer: {
    display: 'flex',
    borderRadius: theme.spacing(0, 0, 1),
    margin: theme.spacing(0, -0.5, -0.5, -0.5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tabsVertical: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: `${VERTICAL_TABS_WIDTH}px`,
  },
  tabsHorizontal: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
  },
  tabPanels: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${VERTICAL_TABS_WIDTH}px)`,
    },
  },
  tabPanelContainer: {
    padding: theme.spacing(2.5),
    width: '100%',
  },
  graphContainer: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  graphOverlay: {
    display: 'block',
    position: 'absolute',
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 2px)',
    textAlign: 'center',
    top: 0,
    left: 0,
    zIndex: 10,
    margin: theme.spacing(-0.5, -0.5, 0, -0.5),
    padding: theme.spacing(20, 4, 4, 4),
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: theme.spacing(1, 1, 0, 0),
  },
  titleContainer: {
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  summaryDiv: {
    marginBottom: theme.spacing(1),
  },
  axisTitle: {
    fontWeight: 600,
    paddingLeft: '0px',
    paddingRight: theme.spacing(1),
  },
  axisSettings: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  axisSettingTitle: {
    textTransform: 'uppercase',
    color: theme.palette.grey[300],
    fontWeight: 700,
    fontSize: '85%',
    marginRight: Theme.spacing(1),
  },
}));

const useTabsStyles = makeStyles(theme => ({
  scrollButtons: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[50],
    },
  },
  scroller: {
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.grey[50],
      borderBottomLeftRadius: theme.spacing(1),
    },
  },
}));

const boxShadow = alpha => `0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,${alpha}),0 0 0 1px rgba(0,0,0,0.02)`;
const useTabStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#ffffff',
      boxShadow: boxShadow(0.06),
    },
    [theme.breakpoints.down('sm')]: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      marginLeft: '-1px',
      paddingRight: theme.spacing(2.5),
    },
    textTransform: 'none',
    opacity: 1,
  },
  labelIcon: {
    minHeight: theme.spacing(8),
    minWidth: theme.spacing(15),
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[50],
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: theme.spacing(6),
      minWidth: theme.spacing(17),
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      margin: `${theme.spacing(0, 1, 0, 0)} !important`,
    },
    opacity: 0.7,
  },
  selected: {
    color: 'white',
    backgroundColor: `${theme.palette.primary.main} !important`,
    '& > span.MuiTab-wrapper': {
      opacity: 1,
    },
  },
}));

/**
   Summary Component
*/
function TimeSeriesViewerSummary() {
  const classes = useStyles(Theme);
  const [state] = TimeSeriesViewerContext.useTimeSeriesViewerState();

  const {
    sites,
    dateRange,
    variables,
    timeStep,
    autoTimeStep,
    logscale,
    qualityFlags,
    rollPeriod,
    yAxes,
  } = state.selection;

  const skeletonProps = {
    variant: 'rect',
    height: 10,
    style: { marginTop: '4px', marginBottom: '12px' },
  };

  // Product
  const productHref = `${NeonEnvironment.getHost()}/data-products/${state.product.productCode}`;
  let productSummaryTitle = (
    <div>
      <Typography variant="h6">Data Product</Typography>
      <Typography variant="body2">{state.product.productCode}</Typography>
    </div>
  );
  let productSummaryDescription = (
    <div>
      <Skeleton {...skeletonProps} width={200} />
      <Skeleton {...skeletonProps} width="100%" />
      <Skeleton {...skeletonProps} width="100%" />
      <Skeleton {...skeletonProps} width={125} />
    </div>
  );
  if (state.product.productName) {
    productSummaryTitle = (
      <div style={{ marginRight: Theme.spacing(1) }}>
        <Typography variant="h6">Data Product</Typography>
        <Typography variant="body2">
          <Link href={productHref} target="_blank" style={{ fontWeight: 600 }}>
            {`${state.product.productName} - (${state.product.productCode})`}
          </Link>
        </Typography>
      </div>
    );
    productSummaryDescription = (
      <div>
        <Typography variant="body2">
          {state.product.productDescription}
        </Typography>
        {state.product.productSensor ? (
          <Typography variant="body2">
            <b>Sensor:</b>
            <span style={{ marginLeft: Theme.spacing(0.5) }}>
              {state.product.productSensor}
            </span>
          </Typography>
        ) : null}
      </div>
    );
  }

  // Sites
  const sitesSummary = !sites.length ? (
    <Skeleton {...skeletonProps} width={175} />
  ) : (
    sites.map((site) => {
      const { siteCode, positions } = site;
      return (
        <Typography variant="body2" key={siteCode}>
          {`${siteCode} - ${positions.join(', ')}`}
        </Typography>
      );
    })
  );

  // Date Range
  let dateRangeSummary = <Skeleton {...skeletonProps} width={300} />;
  if (dateRange.length === 2 && dateRange[0] && dateRange[1]) {
    const pluralize = (val, unit) => (val === 1 ? `${val} ${unit}` : `${val} ${unit}s`);
    const startMoment = moment(`${dateRange[0]}-15`);
    const endMoment = moment(`${dateRange[1]}-15`);
    const months = Math.ceil(endMoment.diff(startMoment, 'months', true)) + 1;
    const years = Math.floor(months / 12);
    let diff = `${pluralize(months, 'month')}`;
    if (years > 0) {
      diff = (!(months % 12))
        ? `${pluralize(years, 'year')}`
        : `${pluralize(years, 'year')}, ${pluralize(months % 12, 'month')}`;
    }
    dateRangeSummary = (
      <Typography variant="body2">
        {`${startMoment.format('MMM YYYY')} - ${endMoment.format('MMM YYYY')} (${diff})`}
      </Typography>
    );
  }

  // Variables
  const variablesSummary = !variables.length ? (
    <Skeleton {...skeletonProps} width={250} />
  ) : (
    <React.Fragment>
      <Typography variant="body2">
        {variables.join(', ')}
      </Typography>
      {qualityFlags.length > 0 ? (
        <Typography variant="body2">
          {`Quality flags: ${qualityFlags.join(', ')}`}
        </Typography>
      ) : null}
    </React.Fragment>
  );

  // Axes
  const axes = { x: [], y1: [], y2: [] };
  const currentTimeStep = timeStep === 'auto' ? `Auto (${autoTimeStep})` : timeStep;
  axes.x.push({ title: 'Time step', value: currentTimeStep });
  if (rollPeriod > 1 && currentTimeStep !== null) {
    axes.x.push({
      title: 'Roll period',
      value: summarizeTimeSteps(rollPeriod, currentTimeStep, false),
    });
  }
  Object.keys(yAxes).forEach((yAxis) => {
    if (yAxes[yAxis].units !== null) {
      axes[yAxis].push({ title: 'Scale', value: logscale ? 'Logarithmic' : 'Linear' });
      axes[yAxis].push({ title: 'Units', value: yAxes[yAxis].units });
      const range = yAxes[yAxis].selectedRange === 'auto' ? 'Auto' : (
        `${yAxes[yAxis].selectedRange[0].toString()} – ${yAxes[yAxis].selectedRange[1].toString()} ${yAxes[yAxis].units}`
      );
      axes[yAxis].push({ title: 'Range', value: range });
    }
  });
  const renderAxisSetting = setting => (
    <div key={setting.title} style={{ marginRight: Theme.spacing(2), whiteSpace: 'nowrap' }}>
      <span className={classes.axisSettingTitle}>
        {`${setting.title}:`}
      </span>
      {setting.value}
    </div>
  );
  const axesSummary = (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell className={classes.axisTitle}>x</TableCell>
          <TableCell className={classes.axisSettings}>{axes.x.map(renderAxisSetting)}</TableCell>
        </TableRow>
        {!axes.y1.length ? null : (
          <TableRow>
            <TableCell className={classes.axisTitle}>y1</TableCell>
            <TableCell className={classes.axisSettings}>{axes.y1.map(renderAxisSetting)}</TableCell>
          </TableRow>
        )}
        {!axes.y2.length ? null : (
          <TableRow>
            <TableCell className={classes.axisTitle}>y2</TableCell>
            <TableCell className={classes.axisSettings}>{axes.y2.map(renderAxisSetting)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div>
      <div className={classes.summaryDiv}>
        {productSummaryTitle}
        {productSummaryDescription}
      </div>
      <div className={classes.summaryDiv}>
        <Typography variant="h6">Sites & Positions</Typography>
        {sitesSummary}
      </div>
      <div className={classes.summaryDiv}>
        <Typography variant="h6">Date Range</Typography>
        {dateRangeSummary}
      </div>
      <div className={classes.summaryDiv}>
        <Typography variant="h6">Variables</Typography>
        {variablesSummary}
      </div>
      <div className={classes.summaryDiv}>
        <Typography variant="h6">x/y Axes</Typography>
        {axesSummary}
      </div>
    </div>
  );
}

/**
   Define Tabs
*/
const TAB_IDS = {
  SUMMARY: 'SUMMARY',
  SITES: 'SITES',
  DATE_RANGE: 'DATE_RANGE',
  VARIABLES: 'VARIABLES',
  AXES: 'AXES',
};
const TABS = {
  [TAB_IDS.SUMMARY]: {
    label: 'SUMMARY',
    ariaLabel: 'Summary',
    Icon: SummaryIcon,
    Component: TimeSeriesViewerSummary,
  },
  [TAB_IDS.SITES]: {
    // eslint-disable-next-line react/jsx-one-expression-per-line
    label: <span>SITES &<br />POSITIONS</span>,
    ariaLabel: 'Sites and Positions',
    Icon: SitesIcon,
    Component: TimeSeriesViewerSites,
  },
  [TAB_IDS.DATE_RANGE]: {
    label: 'DATE RANGE',
    ariaLabel: 'Date Range',
    Icon: DateRangeIcon,
    Component: TimeSeriesViewerDateRange,
  },
  [TAB_IDS.VARIABLES]: {
    label: 'VARIABLES',
    ariaLabel: 'Variables',
    Icon: VariablesIcon,
    Component: TimeSeriesViewerVariables,
  },
  [TAB_IDS.AXES]: {
    label: 'x/y AXES',
    ariaLabel: 'x/y Axes',
    Icon: AxesIcon,
    Component: TimeSeriesViewerAxes,
  },
};

const DEFAULT_TAB = 'SUMMARY';

export default function TimeSeriesViewerContainer() {
  const classes = useStyles(Theme);
  const tabClasses = useTabStyles(Theme);
  const tabsClasses = useTabsStyles(Theme);
  const [state] = TimeSeriesViewerContext.useTimeSeriesViewerState();
  const belowMd = useMediaQuery(Theme.breakpoints.down('sm'));

  const initialTab = DEFAULT_TAB;
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const [loadedProductCode, setLoadedProductCode] = useState(state.product.productCode);

  // Effect to handle a reinitialize event from the context. We track the loaded product code
  // separate from the context product code so when the latter changes we know to reset the
  // tab to SUMMARY and completely unmount and remount the TimeSeriesGraph.
  useEffect(() => {
    if (state.product.productCode === loadedProductCode) { return; }
    setLoadedProductCode(state.product.productCode);
    setSelectedTab(DEFAULT_TAB);
  }, [state.product.productCode, loadedProductCode, setSelectedTab]);

  // Slider position is not controlled in state because doing so kills mouse drag performance.
  // Use a ref to deterministically set slider position for all slider-based features.
  const dateRangeSliderRef = useRef(null);

  const renderTabs = () => (
    <Tabs
      orientation={belowMd ? 'horizontal' : 'vertical'}
      scrollButtons={belowMd ? 'on' : 'auto'}
      variant="scrollable"
      value={selectedTab}
      className={belowMd ? classes.tabsHorizontal : classes.tabsVertical}
      classes={tabsClasses}
      aria-label="Time Series Viewer Controls"
      onChange={(event, newTab) => { setSelectedTab(newTab); }}
      TabIndicatorProps={{ style: { display: 'none' } }}
    >
      {Object.keys(TABS).map((tabId) => {
        const { label, ariaLabel, Icon: TabIcon } = TABS[tabId];
        const style = {};
        if (tabId === TAB_IDS.AXES && !belowMd) {
          style.borderBottomLeftRadius = Theme.spacing(1);
        }
        return (
          <Tab
            key={tabId}
            value={tabId}
            label={label}
            aria-label={ariaLabel || label}
            icon={<TabIcon />}
            classes={tabClasses}
            style={style}
            id={`time-series-viewer-tab-${tabId}`}
            aria-controls={`time-series-viewer-tabpanel-${tabId}`}
          />
        );
      })}
    </Tabs>
  );

  const renderTabPanels = () => (
    <div className={classes.tabPanels}>
      {Object.keys(TABS).map((tabId) => {
        const { Component: TabComponent } = TABS[tabId];
        let tabComponentProps = { setSelectedTab, TAB_IDS };
        if (tabId === TAB_IDS.DATE_RANGE) { tabComponentProps = { dateRangeSliderRef }; }
        return (
          <div
            key={tabId}
            role="tabpanel"
            id={`time-series-viewer-tabpanel-${tabId}`}
            aria-labelledby={`time-series-viewer-tab-${tabId}`}
            style={{ display: selectedTab === tabId ? 'block' : 'none' }}
            className={classes.tabPanelContainer}
          >
            <TabComponent {...tabComponentProps} />
          </div>
        );
      })}
    </div>
  );

  const renderGraphOverlay = () => {
    const isError = state.status === TIME_SERIES_VIEWER_STATUS.ERROR;
    const isLoading = !isError && state.status !== TIME_SERIES_VIEWER_STATUS.READY;
    if (isError) {
      return (
        <div className={classes.graphOverlay}>
          <Typography variant="h6" style={{ marginBottom: Theme.spacing(4) }}>
            {state.displayError || 'An unknown error occurred; unable to visualize data product'}
          </Typography>
          <ErrorIcon fontSize="large" color="error" />
        </div>
      );
    }
    const isLoadingData = isLoading && state.status === TIME_SERIES_VIEWER_STATUS.LOADING_DATA;
    if (isLoading) {
      let title = TIME_SERIES_VIEWER_STATUS_TITLES[state.status] || 'Loading…';
      const progressProps = { variant: 'indeterminate' };
      if (isLoadingData) {
        const progress = Math.floor(state.dataFetchProgress || 0);
        progressProps.variant = 'determinate';
        progressProps.value = progress;
        title = `${title} (${progress}%)`;
      }
      return (
        <div className={classes.graphOverlay}>
          <Typography variant="h6" style={{ marginBottom: Theme.spacing(4) }}>
            {title}
          </Typography>
          <CircularProgress {...progressProps} />
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%' }}>
      <Paper className={classes.graphContainer} elevation={4}>
        <div style={{ position: 'relative' }}>
          {state.product.productCode === loadedProductCode ? (
            <TimeSeriesViewerGraph />
          ) : null}
          {renderGraphOverlay()}
        </div>
        <div className={classes.tabsContainer}>
          {renderTabs()}
          {renderTabPanels()}
        </div>
      </Paper>
    </div>
  );
}