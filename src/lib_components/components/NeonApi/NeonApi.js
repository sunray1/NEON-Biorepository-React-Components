import { of, map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import NeonEnvironment from '../NeonEnvironment/NeonEnvironment';

import { getJson } from '../../util/rxUtil';
import { exists, isStringNonEmpty } from '../../util/typeUtil';

/**
 * Gets the API Token header from the environment.
 * @param {Object|undefined} headers Optional headers to build upon.
 * @return {Object} The resulting header object with API token set.
 */
const getApiTokenHeader = (headers = undefined) => {
  let appliedHeaders = headers || {};
  const apiTokenHeader = NeonEnvironment.getApiTokenHeader();
  const apiToken = NeonEnvironment.getApiToken();
  if (apiTokenHeader && (apiTokenHeader.length > 0)
      && apiToken && (apiToken.length > 0)) {
    // Only add the header when it doesn't already exist.
    if (typeof appliedHeaders[apiTokenHeader] !== 'string') {
      appliedHeaders = {
        ...appliedHeaders,
        [apiTokenHeader]: apiToken,
      };
    }
  }
  return appliedHeaders;
};

/**
 * Convenience function to map an ajax request to response
 * to match the return signature of ajax.getJSON
 */
const mapResponse = map((x) => x.response);

const getAppliedWithCredentials = (withCredentials = undefined) => {
  let appliedWithCredentials = false;
  if (!exists(withCredentials) || (typeof withCredentials !== 'boolean')) {
    appliedWithCredentials = NeonEnvironment.requireCors();
  } else {
    appliedWithCredentials = withCredentials;
  }
  return appliedWithCredentials;
};

/**
 * Gets the RxJS GET AjaxRequest
 * @param {string} url The URL to make the API request to
 * @param {Object|undefined} headers The headers to add to the request
 * @param {boolean} includeToken Option to include the API token in the request
 * @param {boolean} withCredentials Option to include credentials with a CORS request
 * @return The RxJS GET AjaxRequest
 */
const getJsonAjaxRequest = (
  url,
  headers = undefined,
  includeToken = true,
  withCredentials = undefined,
) => {
  let appliedHeaders = headers || {};
  if (includeToken) {
    appliedHeaders = getApiTokenHeader(appliedHeaders);
  }
  const appliedWithCredentials = getAppliedWithCredentials(withCredentials);
  return {
    url,
    method: 'GET',
    responseType: 'json',
    crossDomain: true,
    withCredentials: appliedWithCredentials,
    headers: {
      ...appliedHeaders,
    },
  };
};

/**
 * Gets the RxJS observable for making an API request to the specified URL
 * with optional headers.
 * @param {string} url The URL to make the API request to
 * @param {Object|undefined} headers The headers to add to the request
 * @param {boolean} includeToken Option to include the API token in the request
 * @param {boolean} withCredentials Option to include credentials with a CORS request
 * @return The RxJS Ajax Observable
 */
const getJsonObservable = (
  url,
  headers = undefined,
  includeToken = true,
  withCredentials = undefined,
) => {
  if (typeof url !== 'string' || !url.length) { return of(null); }
  const request = getJsonAjaxRequest(url, headers, includeToken, withCredentials);
  return mapResponse(ajax(request));
};

/**
 * Gets the RxJS HEAD AjaxRequest
 * @param {string} url The URL to make the API request to
 * @param {Object|undefined} headers The headers to add to the request
 * @param {boolean} includeToken Option to include the API token in the request
 * @param {boolean} withCredentials Option to include credentials with a CORS request
 * @return The RxJS HEAD AjaxRequest
 */
const headJsonAjaxRequest = (
  url,
  headers = undefined,
  includeToken = true,
  withCredentials = undefined,
) => {
  let appliedHeaders = headers || {};
  if (includeToken) {
    appliedHeaders = getApiTokenHeader(appliedHeaders);
  }
  const appliedWithCredentials = getAppliedWithCredentials(withCredentials);
  return {
    url,
    method: 'HEAD',
    responseType: 'json',
    crossDomain: true,
    withCredentials: appliedWithCredentials,
    headers: {
      ...appliedHeaders,
    },
  };
};

/**
 * Gets the RxJS observable for making an API request to the specified URL
 * with optional headers.
 * @param {string} url The URL to make the API request to
 * @param {Object|undefined} headers The headers to add to the request
 * @param {boolean} includeToken Option to include the API token in the request
 * @param {boolean} withCredentials Option to include credentials with a CORS request
 * @return The RxJS Ajax Observable
 */
const headJsonObservable = (
  url,
  headers = undefined,
  includeToken = true,
  withCredentials = undefined,
) => {
  if (typeof url !== 'string' || !url.length) { return of(null); }
  const request = headJsonAjaxRequest(url, headers, includeToken, withCredentials);
  return ajax(request);
};

/**
 * Gets the RxJS observable for making a POST API request to the specified URL
 * with body and optional headers.
 * @param {string} url The URL to make the API request to
 * @param {any} body The body to send with the POST request
 * @param {Object|undefined} headers The headers to add to the request
 * @param {boolean} includeToken Option to include the API token in the request
 * @param {boolean} withCredentials Option to include credentials with a CORS request
 * @return The RxJS Ajax Observable
 */
const postJsonObservable = (
  url,
  body,
  headers = undefined,
  includeToken = true,
  withCredentials = undefined,
) => {
  if (typeof url !== 'string' || !url.length) { return of(null); }
  let appliedHeaders = headers || {};
  if (includeToken) {
    appliedHeaders = getApiTokenHeader(appliedHeaders);
  }
  const appliedWithCredentials = getAppliedWithCredentials(withCredentials);
  return ajax({
    url,
    method: 'POST',
    responseType: 'json',
    crossDomain: true,
    withCredentials: appliedWithCredentials,
    headers: {
      ...appliedHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body || {}),
  });
};

/**
 * Container for supplying common NEON API request handlers.
 */
const NeonApi = {
  /**
   * Gets the API Token header from the environment.
   * @param {Object|undefined} headers Optional headers to build upon.
   * @return {Object} The resulting header object with API token set.
   */
  getApiTokenHeader: (headers = undefined) => getApiTokenHeader(headers),
  /**
   * Gets the RxJS observable for making an API request to the specified URL
   * with optional headers.
   * @param {string} url The URL to make the API request to
   * @param {Object|undefined} headers The headers to add to the request
   * @param {boolean} includeToken Option to include the API token in the request
   * @return The RxJS Ajax Observable
   */
  getJsonObservable: (url, headers = undefined, includeToken = true) => (
    getJsonObservable(url, headers, includeToken)
  ),
  /**
   * Gets the RxJS observable for making a POST API request to the specified URL
   * with body and optional headers.
   * @param {string} url The URL to make the API request to
   * @param {any} body The body to send with the POST request
   * @param {Object|undefined} headers The headers to add to the request
   * @param {boolean} includeToken Option to include the API token in the request
   * @return The RxJS Ajax Observable
   */
  postJsonObservable: (url, body, headers = undefined, includeToken = true) => (
    postJsonObservable(url, body, headers, includeToken)
  ),
  /**
   * Gets the RxJS observable for making a HEAD API request to the specified URL
   * with optional headers.
   * @param {string} url The URL to make the API request to
   * @param {Object|undefined} headers The headers to add to the request
   * @param {boolean} includeToken Option to include the API token in the request
   * @return The RxJS Ajax Observable
   */
  headJsonObservable: (url, headers = undefined, includeToken = true) => (
    headJsonObservable(url, headers, includeToken)
  ),

  /**
   * Convenience method for utiliizing the rxUtil => getJson function.
   * This will automatically add the API token header to the request.
   * @param {string} url
   * @param {any} callback
   * @param {any} errorCallback
   * @param {any} cancellationSubject$
   * @param {Object|undefined} headers
   * @return RxJS subscription
   */
  getJson: (url, callback, errorCallback, cancellationSubject$, headers = undefined) => (
    getJson(url, callback, errorCallback, cancellationSubject$, getApiTokenHeader(headers))
  ),

  /**
   * Gets the products endpoint RxJS Observable.
   * @return The RxJS Ajax Observable
   */
  getProductsObservable: () => getJsonObservable(NeonEnvironment.getFullApiPath('products')),

  /**
   * Gets the product endpoint RxJS Observable for the specified product code.
   * @param {string} productCode The product code to get for.
   * @param {string} release An optional release to scope the product.
   * @return The RxJS Ajax Observable
   */
  getProductObservable: (productCode, release = null) => {
    const root = NeonEnvironment.getFullApiPath('products');
    const path = release ? `${root}/${productCode}/${release}` : `${root}/${productCode}`;
    return getJsonObservable(path);
  },

  /**
   * Gets the product tombstone availability endpoint
   * RxJS Observable for the specified product code and release.
   * @param {string} productCode The product code to get for.
   * @param {string} release A release to scope the product.
   * @return The RxJS Ajax Observable
   */
  getProductTombstoneAvailabilityObservable: (productCode, release) => {
    const root = NeonEnvironment.getFullApiPath('products');
    const path = `${root}/${productCode}/${release}/tombstone-data-availability`;
    return getJsonObservable(path);
  },

  /**
   * Gets the product DOI endpoint RxJS Observable for the specified product code and release.
   * @param {string} productCode The product code to get for.
   * @param {string} release An optional release to scope the product DOI.
   * @return The RxJS Ajax Observable
   */
  getProductDoisObservable: (productCode, release) => {
    const root = NeonEnvironment.getFullApiPath('products');
    const path = `${root}/${productCode}/dois/${release}`;
    return getJsonObservable(path);
  },

  /**
   * Gets the product bundles endpoint RxJS Observable.
   * @param {string} release An optional release to scope the bundles.
   * @return The RxJS Ajax Observable
   */
  getProductBundlesObservable: (release = null) => {
    const root = NeonEnvironment.getFullApiPath('productBundles');
    const path = isStringNonEmpty(release)
      ? `${root}?release=${release}`
      : `${root}`;
    return getJsonObservable(path);
  },

  /**
   * Gets the prototype data endpoint RxJS Observable.
   * @return The RxJS Ajax Observable
   */
  getPrototypeDatasetsObservable: () => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('prototype')}/datasets`)
  ),
  getPrototypeDatasetObservable: (uuid) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('prototype')}/datasets/${uuid}`)
  ),
  getPrototypeManifestRollupObservable: (uuid) => (
    // eslint-disable-next-line max-len
    getJsonObservable(`${NeonEnvironment.getFullDownloadApiPath('prototypeManifestRollup')}?uuid=${uuid}`)
  ),
  getPrototypeDataFileObservable: (uuid, fileName) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('prototype')}/data/${uuid}/${fileName}`)
  ),

  /**
   * Gets the release endpoint RxJS Observable.
   * @return The RxJS Ajax Observable
   */
  getReleasesObservable: () => getJsonObservable(NeonEnvironment.getFullApiPath('releases')),

  /**
   * Gets the release endpoint RxJS Observable for the specified release.
   * @param {string} release The release tag to get
   * @return The RxJS Ajax Observable
   */
  getReleaseObservable: (release) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('releases')}/${release}`)
  ),

  /**
   * Gets the sites endpoint RxJS Observable.
   * @return The RxJS Ajax Observable
   */
  getSitesJsonObservable: () => getJsonObservable(NeonEnvironment.getFullApiPath('sites')),
  /**
   * Gets the sites endpoint RxJS Observable for the specified site code.
   * @param {string} siteCode The site code to get for.
   * @return The RxJS Ajax Observable
   */
  getSiteJsonObservable: (siteCode) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('sites')}/${siteCode}`)
  ),

  /**
   * Gets the RxJS Observable for the locations endpoint for a given site hierarchy
   * @param {string} siteCode The site code to get complete hierarchy for.
   * @return The RxJS Ajax Observable
   */
  getSiteLocationHierarchyObservable: (siteCode) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('locations')}/${siteCode}?hierarchy=true`)
  ),

  /**
   * Gets the RxJS Observable for the locations endpoint for a given named location
   * @param {string} location The named location to fetch.
   * @return The RxJS Ajax Observable
   */
  getLocationObservable: (location) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('locations')}/${location}`)
  ),

  /**
   * Gets the RxJS Observable for the ArcGIS asset endpoint for a given feature / site code combo
   * @param {string} feature
   * @param {string} siteCode
   * @return The RxJS Ajax Observable
   */
  getArcgisAssetObservable: (feature, siteCode) => (
    getJsonObservable(
      `${NeonEnvironment.getFullApiPath('arcgisAssets')}/${feature}/${siteCode}`,
      undefined,
      true,
      false,
    )
  ),

  /**
   * Gets the RxJS Observable for the document HEAD endpoint for a given name
   * @param {string} name The document name
   * @return The RxJS Ajax Observable
   */
  headDocumentObservable: (name) => (
    headJsonObservable(`${NeonEnvironment.getFullApiPath('documents')}/${name}`)
  ),
  /**
   * Gets the RxJS Observable for the quick start guides endpoint for a given name
   * @param {string} name The quick start guide name
   * @param {string} version The quick start guide version
   * @return The RxJS Ajax Observable
   */
  getQuickStartGuideDetailObservable: (name, version) => (
    getJsonObservable(`${NeonEnvironment.getFullApiPath('quickStartGuides')}/details/${name}/${version}`)
  ),
  /**
   * Gets the RxJS Observable for the quick start guides HEAD endpoint for a given name
   * @param {string} name The document name
   * @return The RxJS Ajax Observable
   */
  headQuickStartGuideObservable: (name) => (
    headJsonObservable(`${NeonEnvironment.getFullApiPath('quickStartGuides')}/${name}`)
  ),
};

Object.freeze(NeonApi);

export default NeonApi;

// Additional items exported for unit testing
export const getTestableItems = () => (
  process.env.NODE_ENV !== 'test' ? {} : {
    getApiTokenHeader,
    getJsonObservable,
    postJsonObservable,
  }
);
