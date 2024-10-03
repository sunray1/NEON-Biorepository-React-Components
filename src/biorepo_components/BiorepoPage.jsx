import React, {
  useState,
  useEffect,
} from 'react';

import NeonPage from '../lib_components/components/NeonPage/NeonPage';

export default function BiorepoPage() {
  const getDefaultSidebarLinks = () => {
    if (window.location.pathname === '/neon/portal/collections/datasets/publiclist.php') {
    // if (window.location.pathname === '/neon/collections/datasets/publiclist.php') {
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
  const [sidebarLinks, setSidebarLinks] = useState(getDefaultSidebarLinks());
  const [sidebarTitle, setSidebarTitle] = useState('');

  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      try {
        const response = await fetch('/neon/portal/neon-react/biorepo_lib/breadcrumbs.json');
        // const response = await fetch('/neon/neon-react/biorepo_lib/breadcrumbs.json');
        if (!response.ok) {
          throw new Error('Failed to fetch breadcrumbs');
        }
        const data = await response.json();
        const { pathname } = window.location;
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
        const response = await fetch('/neon/portal/neon-react/biorepo_lib/sidebar.json');
        // const response = await fetch('/neon/neon-react/biorepo_lib/sidebar.json');
        if (!response.ok) {
          throw new Error('Failed to fetch sidebar links');
        }
        const data = await response.json();
        const { pathname } = window.location;

        const sidebarData = data[pathname] || data.default;
        setSidebarLinks(sidebarData.links);
        setSidebarTitle(sidebarData.sidebarTitle);
      } catch (error) {
        console.error('Error fetching sidebar links:', error);
      }
    };

    fetchBreadcrumbs();
    fetchSidebarLinks();
  }, []);

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
