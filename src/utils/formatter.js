// int-numberformat dependencies (support for ios v13)
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-getcanonicallocales/polyfill';

// int-pluralrules dependencies (support for ios v12)
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';

/* 
  Note: `notation` & `compactDisplay` properties are not supported yet by Safari. 
  Those require the use of a polyfill: https://www.npmjs.com/package/@formatjs/intl-numberformat
*/
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

export const numberFormatter = (value) => {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

export const internetSpeedFormatter = (value) => {
  return {
    suffix: 'mbps',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value / 1000),
  };
};

export const percentageFormatter = (value, precision = 2) => {
  return {
    suffix: ' %',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value * 100),
  };
};

export const populationTooltipFormatter = (value) => {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(isNaN(value) ? 0 : value);
};

export const bahtFormatter = (value) => {
  return {
    prefix: 'THB',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value * 100),
  };
};

export const bahtTooltipFormatter = (value) => {
  return {
    prefix: 'THB',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(isNaN(value) ? 0 : value * 100),
  };
};
