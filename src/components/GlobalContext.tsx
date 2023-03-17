/* eslint-disable react/prop-types */
import { createContext, FunctionComponent, useCallback, useState } from 'react';
import { TimelineProps as PropsModel } from '../models/TimelineModel';
import {
  getDefaultButtonTexts,
  getDefaultClassNames,
  getDefaultThemeOrDark,
} from '../utils/index';

const GlobalContext = createContext<
  PropsModel & { toggleDarkMode?: () => void }
>({});

const GlobalContextProvider: FunctionComponent<Partial<PropsModel>> = (
  props,
) => {
  const {
    cardHeight = 200,
    cardLess = false,
    flipLayout,
    items = [],
    theme,
    buttonTexts,
    classNames,
    mode,
    fontSizes,
    textOverlay,
    darkMode,
    slideShow,
    onThemeChange,
    mediaSettings,
  } = props;

  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const defaultProps = Object.assign<PropsModel, PropsModel, PropsModel>(
    {},
    {
      alignMedia: mode === 'VERTICAL' && !textOverlay ? 'left' : 'center',
      borderLessCards: false,
      cardLess: false,
      contentDetailsHeight: 150,
      disableAutoScrollOnClick: false,
      disableClickOnCircle: false,
      enableDarkToggle: false,
      focusActiveItemOnLoad: false,
      lineWidth: 3,
      mediaHeight: 200,
      mode: 'VERTICAL_ALTERNATING',
      nestedCardHeight: 150,
      scrollable: {
        scrollbar: false,
      },
      showAllCardsHorizontal: false,
      showProgressOnSlideshow: slideShow,
      slideItemDuration: 2000,
      slideShowType: 'reveal',
      textOverlay: false,
      timelinePointDimension: 16,
      timelinePointShape: 'circle',
      titleDateFormat: 'MMM DD, YYYY',
      useReadMore: true,
    },
    {
      ...props,
      activeItemIndex: flipLayout ? items?.length - 1 : 0,
      buttonTexts: {
        ...getDefaultButtonTexts(),
        ...buttonTexts,
      },
      cardHeight: cardLess ? cardHeight || 80 : cardHeight,
      classNames: {
        ...getDefaultClassNames(),
        ...classNames,
      },
      fontSizes: {
        cardSubtitle: '0.85rem',
        cardText: '1rem',
        cardTitle: '1.25rem',
        title: '1.5rem',
        ...fontSizes,
      },
      mediaSettings: {
        imageFit: 'cover',
        ...mediaSettings,
      },
      theme: {
        ...getDefaultThemeOrDark(isDarkMode),
        ...theme,
      },
    },
  );

  const { children } = props;

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    onThemeChange?.();
  }, [isDarkMode]);

  return (
    <GlobalContext.Provider
      value={{ ...defaultProps, darkMode: isDarkMode, toggleDarkMode }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export { GlobalContext };
