import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';

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

function renderNode(nodes: any[], depth = 0) {
  return nodes.map((node, index) => {
    const isLastChild = index === nodes.length - 1;
    const collidLink = node.collid
      ? `https://biokic4.rc.asu.edu/neon/portal/collections/misc/collprofiles.php?collid=${node.collid}`
      : null;

    const nodeContent = collidLink ? (
      <Link href={collidLink} target="_blank" rel="noopener noreferrer" color="primary" underline="always">
        <Typography color="inherit">{node.name}</Typography>
      </Link>
    ) : (
      <Typography>{node.name}</Typography>
    );

    return (
      <div
        key={node.id}
        style={{
          marginLeft: depth * 20,
          marginBottom: isLastChild ? 20 : 0,
        }}
      >
        <Accordion>
          {node.children ? (
            <AccordionSummary expandIcon={<ExpandIcon />}>
              {nodeContent}
            </AccordionSummary>
          ) : (
            <AccordionDetails>
              {nodeContent}
            </AccordionDetails>
          )}
          {node.children && renderNode(node.children, depth + 1)}
        </Accordion>
      </div>
    );
  });
}

export default function BiorepoCollectionsContent() {
  const [value, setValue] = React.useState(0);
  const [taxonomicNodesData, setTaxonomicNodes] = useState([]);
  const [sampletypeNodesData, setSampletypeNodes] = useState([]);
  const [protocolNodesData, setProtocolNodes] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('/neon/portal/neon-react/biorepo_lib/collections-taxonomic.json')
    // fetch('/neon/neon-react/biorepo_lib/collections-taxonomic.json')
      .then((response) => response.json())
      .then((data) => {
        setTaxonomicNodes(data);
      })
      .catch((error) => console.error('Error loading nodes data:', error));
  }, []);

  useEffect(() => {
    fetch('/neon/portal/neon-react/biorepo_lib/collections-sampletype.json')
    // fetch('/neon/neon-react/biorepo_lib/collections-sampletype.json')
      .then((response) => response.json())
      .then((data) => {
        setSampletypeNodes(data);
      })
      .catch((error) => console.error('Error loading nodes data:', error));
  }, []);

  useEffect(() => {
    fetch('/neon/portal/neon-react/biorepo_lib/collections-protocol.json')
    // fetch('/neon/neon-react/biorepo_lib/collections-protocol.json')
      .then((response) => response.json())
      .then((data) => {
        setProtocolNodes(data);
      })
      .catch((error) => console.error('Error loading nodes data:', error));
  }, []);

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h3">
          Browse Collection Profiles
        </Typography>
        <Box sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Typography variant="body1">
            NEON samples are organized into collections, which generally correspond to the types of samples collected based on NEON protocols and sample classes. It is strongly recommended to read the corresponding protocol to understand how and why the collections are organized as they are. Collections are displayed in various groupings via the tabs below. Click on any collection to view detailed data, records, and statistics.
          </Typography>
        </Box>
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
            {renderNode(taxonomicNodesData)}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div>
            {renderNode(sampletypeNodesData)}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div>
            {renderNode(protocolNodesData)}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
