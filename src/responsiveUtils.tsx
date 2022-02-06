import { useMediaQuery } from 'react-responsive'

export const isDesktop = (): boolean => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop;
}

export const isTablet = (): boolean => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet;
}

export const isMobile = (): boolean => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile;
}

export const isDefault = (): boolean => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile;
}

type ResponsiveProps = {
  _default: JSX.Element;
  mobile?: JSX.Element;
  tablet?: JSX.Element;
  desktop?: JSX.Element;
}

export const ResponsiveComponent = (props: ResponsiveProps): JSX.Element => {
  const { _default, mobile, tablet, desktop } = props;
  const returnMobile = isMobile() && mobile;
  const returnTablet = isTablet() && tablet;
  const returnDesktop = isDesktop() && desktop;
  if (returnMobile) {
    return mobile;
  }
  if (returnTablet) {
    return tablet;
  }
  if (returnDesktop) {
    return desktop;
  }
  return _default;
}