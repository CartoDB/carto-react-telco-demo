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

const parseLogicalOperation = (value) => {
  if (!isNaN(value)) return { value: value, operation: '' };
  const _value = typeof value === 'string' ? value.replace('>', '') : value;
  return isNaN(_value) ? { value: 0, operation: '' } : { value: _value, operation: '> ' };
};

export const numberFormatter = (value) => {
  const _value = parseLogicalOperation(value);

  return (
    _value.operation +
    Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(_value.value)
  );
};

export const internetSpeedFormatter = (value, precision = 0) => {
  const _value = parseLogicalOperation(value);
  return {
    suffix: 'mbps',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(_value.value / 1000), // convert kbps to mbps
  };
};

export const percentageFormatter = (value, precision = 2) => {
  const _value = parseLogicalOperation(value);
  return {
    suffix: ' %',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: precision,
        minimumFractionDigits: precision,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(_value.value * 100), // Convert decimal to percentage
  };
};

export const populationTooltipFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return (
    _value.operation +
    Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(_value.value)
  );
};

export const bahtFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return {
    prefix: 'THB',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
        minimumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(_value.value),
  };
};

export const bahtTooltipFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return {
    prefix: 'THB',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(_value.value),
  };
};

export const euroTooltipFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return {
    prefix: 'EUR',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(_value.value),
  };
};

export const euroFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return {
    prefix: 'EUR',
    value:
      _value.operation +
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short',
      }).format(_value.value),
  };
};
