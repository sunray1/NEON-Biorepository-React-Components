import React, {
  useState,
  useEffect,
} from 'react';

import NeonPage from '../lib_components/components/NeonPage/NeonPage';

export default function BiorepoPage() {
  const [config, setConfig] = useState(null);

  const getDefaultSidebarLinks = () => {
    if (window.location.pathname.endsWith('/publiclist.php')) {
      return [
        {
          name: 'Papers & Publications',
          hash: 'https://www.neonscience.org/impact/papers-publications',
        },
      ];
    }
    return [
      {
        name: 'Sample Portal',
        hash: 'https://biokic4.rc.asu.edu/neon/portal/index.php',
      },
    ];
  };

  // Get breadcrumbs and sidebar from json based on pathname
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [sidebarLinks, setSidebarLinks] = useState([]);
  const [sidebarTitle, setSidebarTitle] = useState('');

  useEffect(() => {
    // Fetch configuration from getSymbiniConfig.php
    const fetchConfig = async () => {
      const basePath = window.location.origin;
      const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
      const pathSegments = currentPath.split('/').filter(Boolean);
      let clientRootPath = '/';
      for (let i = 1; i <= pathSegments.length; i += 1) {
        const candidatePath = `/${pathSegments.slice(0, i).join('/')}/neon-react`;
        // Check if the resource exists (use HEAD request to test for existence)
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', `${basePath}${candidatePath}`, false);
        xhr.send();
        if (xhr.status === 200) {
          clientRootPath = `/${pathSegments.slice(0, i).join('/')}`;
          break;
        }
      }
      const fetchUrl = `${basePath}${clientRootPath}/neon-react/biorepo_lib/getSymbiniConfig.php`;
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Error fetching configuration:', error);
      }
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    if (!config) return;
    setSidebarLinks(getDefaultSidebarLinks());
    const fetchBreadcrumbs = async () => {
      try {
        const response = await fetch(`${config.CLIENT_ROOT}/neon-react/biorepo_lib/breadcrumbs.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch breadcrumbs');
        }
        const data = await response.json();
        const pathname = window.location.pathname.slice(config.CLIENT_ROOT.length);
        const breadcrumbData = data[pathname] || [{ name: 'Home', href: '/' }];
        setBreadcrumbs(breadcrumbData);

        const breadcrumbNav = document.querySelector('nav[data-selenium="neon-page.breadcrumbs"]');
        const innerTextDiv = document.getElementById('innertext');
        const parentDiv = innerTextDiv.parentNode;
        parentDiv.insertBefore(breadcrumbNav, innerTextDiv);
      } catch (error) {
        console.error('Error fetching breadcrumbs:', error);
      }
    };

    const fetchSidebarLinks = async () => {
      try {
        const response = await fetch(`${config.CLIENT_ROOT}/neon-react/biorepo_lib/sidebar.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch sidebar links');
        }
        const data = await response.json();
        const pathname = window.location;

        const sidebarData = data[pathname] || data.default;
        setSidebarLinks(sidebarData.links);
        setSidebarTitle(sidebarData.sidebarTitle);
      } catch (error) {
        console.error('Error fetching sidebar links:', error);
      }
    };

    fetchBreadcrumbs();
    fetchSidebarLinks();
  }, [config]);

  return (
    <NeonPage
      breadcrumbs={breadcrumbs}
      breadcrumbHomeHref="https://www.neonscience.org/"
      sidebarLinks={sidebarLinks}
      sidebarTitle={sidebarTitle}
    >
    </NeonPage>
  );
}
