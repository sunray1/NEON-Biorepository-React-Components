import cloneDeep from 'lodash/cloneDeep';
import { TIME_SERIES_VIEWER_STATUS } from './constants';

/**
 * Alter the current state for valid JSON serialization.
 * @param currentState The current state
 */
const convertStateForStorage = (state: any): any => {
  const newState = cloneDeep(state);
  switch (newState.status) {
    case TIME_SERIES_VIEWER_STATUS.INIT_PRODUCT:
    case TIME_SERIES_VIEWER_STATUS.LOADING_META:
    case TIME_SERIES_VIEWER_STATUS.READY_FOR_DATA:
    case TIME_SERIES_VIEWER_STATUS.LOADING_DATA:
    case TIME_SERIES_VIEWER_STATUS.WARNING:
    case TIME_SERIES_VIEWER_STATUS.ERROR:
      newState.status = TIME_SERIES_VIEWER_STATUS.INIT_PRODUCT;
      break;
    case TIME_SERIES_VIEWER_STATUS.READY:
      newState.status = TIME_SERIES_VIEWER_STATUS.READY_FOR_SERIES;
      break;
    default:
      break;
  }
  // variables
  const { variables: stateVariables } = state;
  Object.keys(stateVariables).forEach((variableKey, index) => {
    const { sites, tables, timeSteps } = stateVariables[variableKey];
    if (sites instanceof Set && sites.size > 0) {
      newState.variables[variableKey].sites = Array.from(sites);
    } else {
      newState.variables[variableKey].sites = [];
    }
    if (tables instanceof Set && sites.size > 0) {
      newState.variables[variableKey].tables = Array.from(tables);
    } else {
      newState.variables[variableKey].tables = [];
    }
    if (timeSteps instanceof Set && sites.size > 0) {
      newState.variables[variableKey].timeSteps = Array.from(timeSteps);
    } else {
      newState.variables[variableKey].timeSteps = [];
    }
  });
  // product site variables
  const { sites: productSites } = state.product;
  Object.keys(productSites).forEach((siteKey, index) => {
    const { variables: siteVariables } = productSites[siteKey];
    if (siteVariables instanceof Set && siteVariables.size > 0) {
      newState.product.sites[siteKey].variables = Array.from(siteVariables);
    } else {
      newState.product.sites[siteKey].variables = [];
    }
  });
  // available quality flags
  const { availableQualityFlags } = state;
  if (availableQualityFlags instanceof Set) {
    newState.availableQualityFlags = Array.from(availableQualityFlags);
  } else {
    newState.availableQualityFlags = [];
  }
  // available time steps
  const { availableTimeSteps } = state;
  if (availableTimeSteps instanceof Set) {
    newState.availableTimeSteps = Array.from(availableTimeSteps);
  } else {
    newState.availableTimeSteps = [];
  }
  return newState;
};

/**
 * Restore the state from JSON serialization.
 * @param storedState The state read from storage.
 */
const convertStateFromStorage = (state: any): any => {
  const newState = cloneDeep(state);
  // graphData data
  const data = state.graphData.data.map((entry: any) => [new Date(entry[0]), entry[1]]);
  newState.graphData.data = data;
  // state variables
  const { variables } = state;
  Object.keys(variables).forEach((key, index) => {
    const { sites, tables, timeSteps } = variables[key];
    if (Array.isArray(sites)) {
      newState.variables[key].sites = new Set(sites);
    } else {
      newState.variables[key].sites = new Set();
    }
    if (Array.isArray(tables)) {
      newState.variables[key].tables = new Set(tables);
    } else {
      newState.variables[key].tables = new Set();
    }
    if (Array.isArray(timeSteps)) {
      newState.variables[key].timeSteps = new Set(timeSteps);
    } else {
      newState.variables[key].timeSteps = new Set();
    }
  });
  // product site variables
  const { sites: productSites } = state.product;
  // get the variables for each site
  Object.keys(productSites).forEach((siteKey, index) => {
    const { variables: siteVariables } = productSites[siteKey];
    if (Array.isArray(siteVariables) && siteVariables.length > 0) {
      newState.product.sites[siteKey].variables = new Set(siteVariables);
    } else {
      newState.product.sites[siteKey].variables = new Set();
    }
  });
  // available quality flags
  const { availableQualityFlags } = state;
  if (Array.isArray(availableQualityFlags)) {
    newState.availableQualityFlags = new Set(availableQualityFlags);
  } else {
    newState.availableQualityFlags = new Set();
  }
  // available quality flags
  const { availableTimeSteps } = state;
  if (Array.isArray(availableTimeSteps)) {
    newState.availableTimeSteps = new Set(availableTimeSteps);
  } else {
    newState.availableTimeSteps = new Set();
  }
  return newState;
};

export { convertStateForStorage, convertStateFromStorage };
