
/**
 * Initialization function that validates environment
 * requirements.
 */
angular.module('material.core', [ 'material.core.theming' ]);

function MdCoreConfigure($provide, $mdThemingProvider) {

  $provide.decorator('$$rAF', ["$delegate", rAFDecorator]);

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('grey');
}
