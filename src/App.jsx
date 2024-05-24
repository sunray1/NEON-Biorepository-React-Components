import React, {
  useState,
  useEffect,
} from 'react';

import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

import NeonPage from './lib_components/components/NeonPage/NeonPage';

export default function App() {
  // Get breadcrumbs from json based on pathname
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      try {
        const response = await fetch('/NEON-Biorepository/neon-react/biorepo_lib/breadcrumbs.json');
        if (!response.ok) {
          throw new Error('Failed to fetch breadcrumbs');
        }
        const data = await response.json();
        const { pathname } = window.location;
        const breadcrumbData = data[pathname] || [{ name: 'Home', href: '/' }];
        setBreadcrumbs(breadcrumbData);
      } catch (error) {
        console.error('Error fetching breadcrumbs:', error);
      }
    };

    fetchBreadcrumbs();
  }, []);

  // Get breadcrumbs from json based on pathname
  const sidebarLinks = [
    {
      name: 'Home',
      pageTitle: 'Core Components',
      icon: HomeIcon,
      hash: 'http://localhost/NEON-Biorepository-React-Components/build/',
    },
    {
      name: 'Search',
      hash: 'https://biorepo.neonscience.org/portal/neon/search/index.php',
    },
  ];

  return (
    <NeonPage
      title="NEON Data Portal Core Components"
      breadcrumbs={breadcrumbs}
      breadcrumbHomeHref="https://www.neonscience.org/"
      sidebarLinks={sidebarLinks}
      useCoreAuth
    >
    </NeonPage>
  );
}
