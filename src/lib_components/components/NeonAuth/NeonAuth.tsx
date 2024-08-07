/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, Dispatch } from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme as MuiThemeType } from '@material-ui/core/styles';

import AuthService, { LOGOUT_REDIRECT_PATHS } from './AuthService';
import NeonContext, { FETCH_STATUS } from '../NeonContext/NeonContext';
import NeonEnvironment from '../NeonEnvironment/NeonEnvironment';
import Theme from '../Theme/Theme';
import NeonSignInButtonState from '../NeonSignInButton/NeonSignInButtonState';

import { StringPropsObject } from '../../types/objectTypes';
import { StylesHook } from '../../types/muiTypes';
import { Undef } from '../../types/core';
import { isStringNonEmpty } from '../../util/typeUtil';

export enum NeonAuthType {
  REDIRECT = 'REDIRECT',
  SILENT = 'SILENT',
}
export enum NeonAuthDisplayType {
  MENU = 'MENU',
}

export interface NeonAuthProps {
  loginType: NeonAuthType;
  logoutType: NeonAuthType;
  displayType: NeonAuthDisplayType;
  loginPath: string;
  logoutPath: string;
  accountPath: string;
}

const useStyles: StylesHook = makeStyles((theme: MuiThemeType) => ({
  button: {
    whiteSpace: 'nowrap',
    // The following styles are !important overrides to styles applied by the drupal header.css
    // when NeonAuth is injected into the drupal header.
    color: `${theme.palette.primary.main} !important`,
    textTransform: 'uppercase !important' as 'uppercase',
    fontSize: '0.55rem !important',
    fontWeight: '600 !important' as any,
    fontFamily: '"Inter",Helvetica,Arial,sans-serif !important',
    lineHeight: '1.75 !important',
  },
})) as StylesHook;

const UX_TIMEOUT_MS: number = 300;

const triggerAuth = (
  path: string,
  login: boolean,
  dispatch: Dispatch<any>,
  redirectUriPath?: string,
): void => {
  if (!path) return;
  // Give the browser time to render to allow for immediate feedback
  // by way of a spinner.
  dispatch({ type: 'setAuthWorking', isAuthWorking: true });
  setTimeout(
    () => {
      if (login) {
        AuthService.login(path, redirectUriPath);
      } else {
        AuthService.logout(path, redirectUriPath);
      }
    },
    UX_TIMEOUT_MS,
  );
};

const renderAuth = (
  props: NeonAuthProps,
  classes: StringPropsObject,
  isAuthenticated: boolean,
  showAuthWorking: boolean,
  isAuthWsConnected: boolean,
  dispatch: Dispatch<any>,
): JSX.Element => {
  const {
    loginType,
    logoutType,
    displayType,
    loginPath,
    logoutPath,
    accountPath,
  }: NeonAuthProps = props;

  const handleLogin = (): void => {
    if (NeonEnvironment.enableGlobalSignInState) {
      // Notify observers the sign in button has been clicked.
      NeonSignInButtonState.sendNotification();
    }
    let appliedLoginType: NeonAuthType = loginType;
    // Default to redirect if WS isn't connected
    if (!isAuthWsConnected) {
      appliedLoginType = NeonAuthType.REDIRECT;
    }
    const redirectUriPath: Undef<string> = AuthService.getLoginRedirectUri();
    switch (appliedLoginType) {
      case NeonAuthType.SILENT:
        AuthService.loginSilently(dispatch, false, loginPath, redirectUriPath);
        break;
      case NeonAuthType.REDIRECT:
      default:
        triggerAuth(loginPath, true, dispatch, redirectUriPath);
        break;
    }
  };
  const handleLogout = (): void => {
    let appliedLogoutType: NeonAuthType = logoutType;
    let redirectUriPath: Undef<string>;
    // Default to redirect if WS isn't connected
    if (!isAuthWsConnected) {
      appliedLogoutType = NeonAuthType.REDIRECT;
    }
    const appHomePath: string = NeonEnvironment.getRouterBaseHomePath();
    if (LOGOUT_REDIRECT_PATHS.indexOf(appHomePath) >= 0) {
      appliedLogoutType = NeonAuthType.REDIRECT;
      redirectUriPath = NeonEnvironment.route.home();
    } else {
      // If not a auto redirect path, redirect back to the current path
      const currentPath: string = window.location.pathname;
      const hasPath: boolean = isStringNonEmpty(currentPath) && currentPath.includes(appHomePath);
      redirectUriPath = hasPath ? currentPath : appHomePath;
    }
    switch (appliedLogoutType) {
      case NeonAuthType.SILENT:
        AuthService.logoutSilently(dispatch, logoutPath, redirectUriPath);
        break;
      case NeonAuthType.REDIRECT:
      default:
        triggerAuth(logoutPath, false, dispatch, redirectUriPath);
        break;
    }
  };
  // eslint-disable-next-line react/jsx-no-useless-fragment
  let authContent: JSX.Element = <></>;
  switch (displayType) {
    case NeonAuthDisplayType.MENU:
    default:
      authContent = (
        <Button
          size="small"
          variant="outlined"
          className={classes.button}
          data-selenium="neon-menu.sign-in-button"
          onClick={() => handleLogin()}
        >
          Sign In
        </Button>
      );
      if (showAuthWorking) {
        authContent = (
          <div style={{ display: 'flex', alignItems: 'center', margin: Theme.spacing(0.5) }}>
            <span
              style={{
                fontStyle: 'italic',
                marginRight: Theme.spacing(1),
                color: Theme.palette.grey[400],
              }}
            >
              {isAuthenticated ? 'Signing out...' : 'Signing in...'}
            </span>
            <CircularProgress size={20} />
          </div>
        );
      } else if (isAuthenticated) {
        authContent = (
          <ButtonGroup size="small" aria-label="Authentication">
            <Button
              className={classes.button}
              data-selenium="neon-menu.sign-out-button"
              onClick={() => handleLogout()}
            >
              Sign Out
            </Button>
            <Button
              href={accountPath}
              className={classes.button}
              data-selenium="neon-menu.my-account-button"
            >
              My Account
            </Button>
          </ButtonGroup>
        );
      }
      break;
  }
  return authContent;
};

const NeonAuth = (props: NeonAuthProps): JSX.Element => {
  const [
    {
      auth: {
        isAuthenticated,
        isAuthWorking,
        isAuthWsConnected,
      },
      fetches: {
        auth: {
          status,
        },
      },
    },
    dispatch,
  ] = NeonContext.useNeonContextState();

  const classes: StringPropsObject = useStyles(Theme);

  const isFetchingAuthentication: boolean = (status === FETCH_STATUS.FETCHING);
  const isAuthFetched: boolean = ([FETCH_STATUS.SUCCESS, FETCH_STATUS.ERROR].indexOf(status) >= 0);
  const showAuthWorking: boolean = (isAuthWorking || isFetchingAuthentication);

  const authFetchCb = useCallback(() => {
    AuthService.fetchUserInfoWithDispatch(dispatch);
  }, [dispatch]);
  if (!isFetchingAuthentication && !isAuthFetched) {
    authFetchCb();
  }
  return (
    <>
      {renderAuth(props, classes, isAuthenticated, showAuthWorking, isAuthWsConnected, dispatch)}
    </>
  );
};

const WrappedNeonAuth = (Theme as any).getWrappedComponent(
  NeonContext.getWrappedComponent(NeonAuth),
);

export default WrappedNeonAuth;
