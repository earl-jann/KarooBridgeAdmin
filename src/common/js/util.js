const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  const lenTemp = len - (s + '').length;
  for (let i = 0; i < lenTemp; i++) { s = '0' + s; }
  return s;
}

export default {
  getQueryStringByName(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)", i');
    let r = window.location.search.substr(1).match(reg);
    let context = '';
    if (r != null) {
      context = r[2];
    }
    reg = null;
    r = null;
    return context === null || context === '' || context === 'undefined' ? '' : context;
  },
  formatDate: {
    format(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, ($0) => {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length);
          case 'M': return padding(date.getMonth() + 1, $0.length);
          case 'd': return padding(date.getDate(), $0.length);
          case 'w': return date.getDay() + 1;
          case 'h': return padding(date.getHours(), $0.length);
          case 'm': return padding(date.getMinutes(), $0.length);
          case 's': return padding(date.getSeconds(), $0.length);
          default : return $0;
        }
      });
    },
    parse(dateString, pattern) {
      const matchs1 = pattern.match(SIGN_REGEXP);
      const matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        const dateTemp = new Date(1970, 0, 1);
        for (let i = 0; i < matchs1.length; i++) {
          const intTemp = parseFloat(matchs2[i]);
          const sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y': dateTemp.setFullYear(intTemp); break;
            case 'M': dateTemp.setMonth(intTemp - 1); break;
            case 'd': dateTemp.setDate(intTemp); break;
            case 'h': dateTemp.setHours(intTemp); break;
            case 'm': dateTemp.setMinutes(intTemp); break;
            case 's': dateTemp.setSeconds(intTemp); break;
            default : break;
          }
        }
        return dateTemp;
      }
      return null;
    },
  },
};
