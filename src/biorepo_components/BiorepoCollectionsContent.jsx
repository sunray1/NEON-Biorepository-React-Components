import React from 'react';

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandIcon from '@material-ui/icons/ExpandMore';

const CLIENT_ROOT = 'https://biokic4.rc.asu.edu/neon/portal';
// const CLIENT_ROOT = 'http://localhost/neon';

function CustomTabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

CustomTabPanel.defaultProps = {
  children: PropTypes.string,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const nodesData = {
  id: 1,
  name: 'de Volksbank',
  children: [
    {
      id: 2,
      name: 'dVb',
      children: [
        {
          id: 4,
          name: 'Level',
          children: [
            { id: 6, name: 'Level 13.3' },
            { id: 7, name: 'Level 14.1' },
          ],
        },
        {
          id: 5,
          name: 'VIS',
          children: [
            { id: 8, name: 'Audascan' },
            { id: 9, name: 'RDW' },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'ASN',
      children: [
        {
          id: 10,
          name: 'Level',
          children: [
            { id: 11, name: 'Level 13.3' },
            { id: 12, name: 'Level 14.1' },
          ],
        },
        {
          id: 13,
          name: 'VIS',
          children: [
            { id: 14, name: 'Audascan' },
            { id: 15, name: 'RDW' },
          ],
        },
      ],
    },
  ],
};

function renderNode(nodes: any[], depth = 0) {
  return nodes.map((node, index) => {
    const isLastChild = index === nodes.length - 1;
    return (
      <div
        key={node.id}
        style={{
          marginLeft: depth * 20,
          marginBottom: isLastChild ? 20 : 0,
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={node.children ? <ExpandIcon /> : null}
          >
            <Typography>{node.name}</Typography>
          </AccordionSummary>
          {node.children && renderNode(node.children, depth + 1)}
        </Accordion>
      </div>
    );
  });
}

export default function BiorepoCollectionsContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2">
          Sample Collection Profiles
        </Typography>
        <Typography variant="body1">
          NEON samples are organized into collections, which generally correspond to the types of samples collected based on NEON protocols and sample classes. It is strongly recommended to read the corresponding protocol to understand how and why the collections are organized as they are. Collections are displayed in various groupings via the tabs below. Click on any collection to view detailed data, records, and statistics.
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="collections-tabs"
            variant="fullWidth"
          >
            <Tab label="Browse by Taxonomic Group" {...a11yProps(0)} />
            <Tab label="Browse by Sample Type" {...a11yProps(1)} />
            <Tab label="Browse by Protocol" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            {renderNode([nodesData])}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div>
            {renderNode([nodesData])}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div>
            {renderNode([nodesData])}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
