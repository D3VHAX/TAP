import URL from 'url';

/**
 * Strip useless URL query string parameters (some provider uses utm_* parameters)
 */
function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts= url.split('?');
  if (urlparts.length>=2) {

    var prefix= encodeURIComponent(parameter)+'=';
    var pars= urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i= pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    return url;
  } else {
    return url;
  }
}

let cleaner = function(url, urlStripParameters) {
  url = url.trim();
  urlStripParameters.forEach(function(value) {
    removeURLParameter(url, value);
  });

  // remove anchor
  return url.split('#')[0];
};

export default cleaner;