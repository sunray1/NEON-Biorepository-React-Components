/* eslint-disable react/jsx-one-expression-per-line, jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import DocBlock from '../../../components/DocBlock';
import CodeBlock from '../../../components/CodeBlock';
import ExampleBlock from '../../../components/ExampleBlock';

import NeonContext from './NeonContext';
import Theme from '../Theme/Theme';

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const NeonContextStateComponent = () => {
  const [{ data, fetches }] = NeonContext.useNeonContextState();
  const {
    sites,
    states,
    domains,
    bundles,
  } = data;
  const preStyle = {
    height: '15vh',
    overflow: 'scroll',
    border: '1px solid black',
    padding: '2px',
  };
  return (
    <div style={{ width: '100%' }}>
      <div>Sites</div>
      <pre style={preStyle}>
        {fetches.sites.status === 'SUCCESS' ? JSON.stringify(sites, null, 2) : fetches.sites.status}
      </pre>
      <div>States</div>
      <pre style={preStyle}>{JSON.stringify(states, null, 2)}</pre>
      <div>Domains</div>
      <pre style={preStyle}>{JSON.stringify(domains, null, 2)}</pre>
      <div>Bundles</div>
      <pre style={preStyle}>{JSON.stringify(bundles, null, 2)}</pre>
    </div>
  );
};

export default function StyleGuide(props) {
  const { onClickHash } = props;
  const classes = useStyles(Theme);
  const NeonPageLink = (
    <Link href="#NeonPage" onClick={() => onClickHash('#NeonPage')}>NeonPage</Link>
  );

  return (
    <React.Fragment>

      <DocBlock>
        Many components in Portal Core Components, as well as many apps utilizing Portal Core
        Components (including NeonPage) to stand up functioning pages require a few common and
        infrequently-changing data structures.
      </DocBlock>
      <DocBlock>
        One example of such a data structure is the list of NEON Sites with basic meta data
        (names, types, latitude/longitude, etc.). Also a listing of NEON domains with their codes
        and names, or US States. Some of this information is hard-coded in Portal Core Components
        as JSON files while other information (notably NEON Sites) comes primarily from the server.
      </DocBlock>
      <DocBlock>
        The NeonContext component is a React context that affords a provider and a hook to use its
        state. On mount it will do a one-time fetch and/or import for each of these data structures
        such that any pages or components in the session may get them all from a single source
        without having to worry about fetch management.
      </DocBlock>
      <CodeBlock>
        {`
import NeonContext from 'portal-core-components/lib/components/NeonContext';
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Provider</Typography>

      <DocBlock>
        The NeonContext Provider should be used a the highest order necessary to capture all
        components within that would need to use the state it provides. It takes no props and
        one should never nest a NeonContext Provider within another NeonContext Provider.
      </DocBlock>
      <CodeBlock>
        {`
import NeonContext from 'portal-core-components/lib/components/NeonContext';

const MyComponent = () => {
  ...
  return (
    <NeonContext.Provider>
      ...
    </NeonContext.Provider>
  );
};
        `}
      </CodeBlock>

      <DocBlock>
        <span style={{ fontWeight: 600 }}>
          IMPORTANT NOTE: {NeonPageLink} wraps its childen in a NeonContext Provider. Also any core
          components that require an active context will wrap themselves in one if there is not one
          available. Only use the Provider when wrapping new components that will need to access
          the NeonContext state.
        </span>
      </DocBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Accessing State with useNeonContextState()</Typography>

      <DocBlock>
        NeonContext state can be accessed using the <tt>useNeonContextState()</tt> hook. Note that
        this hook <i>only</i> provides state. It does not provide a dispatch function, in that this
        state cannot be written to by components that consume it.
      </DocBlock>
      <DocBlock>
        The example below deomnstrates how to use the <tt>useNeonContextState()</tt> hook to access
        state in a basic component. This component displays the four NeonContext state data
        structures as they become available:
      </DocBlock>
      <ul>
        <li>
          <b><tt>sites</tt></b> - Meta data object for NEON sites keyed by siteCode
          (e.g. <tt>ABBY</tt>)
        </li>
        <li>
          <b><tt>states</tt></b> - Meta data object for US states keyed by stateCode
          (e.g. <tt>CO</tt>)
        </li>
        <li>
          <b><tt>domains</tt></b> - Meta data object for NEON domains keyed by domainCode
          (e.g. <tt>D01</tt>)
        </li>
        <li>
          <b><tt>bundles</tt></b> - Meta data object containing mappings of children and parents for
          bundled data products
        </li>
      </ul>
      <ExampleBlock>
        <NeonContextStateComponent />
      </ExampleBlock>
      <CodeBlock>
        {`
import NeonPage from 'portal-core-components/lib/components/NeonPage';

const NeonContextStateComponent = () => {
  const [{ data, fetches }] = NeonPage.useNeonContextState();
  const { sites, states, domains, bundles } = data;
  const preStyle = { height: '15vh', overflow: 'scroll', border: '1px solid black', padding: '2px' };
  return (
    <div style={{ width: '100%' }}>
      <div>Sites</div>
      <pre style={preStyle}>
        {fetches.sites.status === 'SUCCESS' ? JSON.stringify(sites, null, 2) : fetches.sites.status}
      </pre>
      <div>States</div>
      <pre style={preStyle}>{JSON.stringify(states, null, 2)}</pre>
      <div>Domains</div>
      <pre style={preStyle}>{JSON.stringify(domains, null, 2)}</pre>
      <div>Bundles</div>
      <pre style={preStyle}>{JSON.stringify(bundles, null, 2)}</pre>
    </div>
  );
};

export default NeonContextStateComponent;
        `}
      </CodeBlock>

      <Divider className={classes.divider} />
      <Typography variant="h6" component="h4" gutterBottom>Self-Wrapping Components</Typography>

      <DocBlock>
        Several components in this library require an active NeonContext for the information it
        provides. However these components are also designed to function outside of a NeonPage if
        need be. NeonContext provides <tt>getWrappedComponent()</tt>, a function intended to
        dynamically ensure a NeonContext is there in either use case.
      </DocBlock>
      <CodeBlock>
        {`
import NeonContext from 'portal-core-components/lib/components/NeonContext';

const Foo = (props) => {
  const [{ data: neonContextData }] = NeonContext.useNeonContextState();
  ...
  return (...);
}

Foo.propTypes = { ... };
Foo.defaultProps = { ... };

const WrappedFoo = NeonContext.getWrappedComponent(Foo);

export default WrappedFoo;
        `}
      </CodeBlock>
      <DocBlock>
        The example above shows how a component might look when it both consumes NeonContext state
        and self-wraps to make sure such state is always available. The WrappedFoo component,
        exported as default, can still be imported as Foo. Its only purpose is to check if there is
        an active NeonContext and, if not, wrap the component in a Provider.
      </DocBlock>
      <DocBlock>
        Note that since NeonContext generates fetches if two or more self-wrapped components appear
        on a page that does not have a higher-order NeonContext then duplicate siloed fetches will
        happen. This is not very DRY (Don&apos;t Repeat Yourself), so it is incumbent on the
        developer to make add a higher order NeonContext Provider if the situation calls for it.
      </DocBlock>

    </React.Fragment>
  );
}

StyleGuide.propTypes = {
  onClickHash: PropTypes.func.isRequired,
};