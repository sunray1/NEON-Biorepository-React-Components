import React, {
  useState,
  useEffect,
} from 'react';

import NeonPage from '../lib_components/components/NeonPage/NeonPage';

export default function BiorepoPage() {
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

  const sidebarLinks = [
    {
      name: 'Data Portal',
      hash: 'https://www.neonscience.org/data',
    },
    {
      name: 'Sample Portal',
      hash: 'index.php',
    },
    {
      name: 'Themes',
      hash: 'https://www.neonscience.org/data-samples/data-themes',
    },
    {
      name: 'Collection Methods',
      hash: 'https://www.neonscience.org/data-collection',
    },
    {
      name: 'Notifications',
      hash: 'https://www.neonscience.org/data-samples/data-notifications',
    },
    {
      name: 'Spatial Data & Maps',
      hash: 'https://www.neonscience.org/data-samples/data/spatial-data-maps',
    },
    {
      name: 'Document Library',
      hash: 'https://data.neonscience.org/documents',
    },
  ];

  return (
    <NeonPage
      title="NEON Biorepository Sample Portal at ASU"
      breadcrumbs={breadcrumbs}
      breadcrumbHomeHref="https://www.neonscience.org/"
      sidebarLinks={sidebarLinks}
      sidebarTitle="Data & Samples"
      useCoreAuth
    >
    </NeonPage>
  );
}
