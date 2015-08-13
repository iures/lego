/**
 * @ngdoc module
 * @name ct.components.sidenav
 *
 * @description
 * A Sidenav ct component.
 */
angular.module('ct.components.sidenav', [
    'ct.core'
  ])
  .controller('$ctSidenavController', SidenavController)
  .directive('ctSidenav', SidenavDirective);

/**
 * @ngdoc directive
 * @name mdSidenav
 * @module ct.components.sidenav
 * @restrict E
 *
 * @description
 *
 * A Sidenav component
 */
function SidenavDirective($mdTheming, $compile) {
  return {
    restrict: 'E',
    scope: {
      title: '=title'
    },
    controller: '$ctSidenavController',
    link: postLink
  };

  function postLink($scope, $element, $attr) {
    $element.addClass('ct-card');
    $element.prepend("<label>"+ $scope.title +"</label>");
  }
}

/*
 * @private
 * @ngdoc controller
 * @name SidenavController
 * @module ct.components.sidenav
 *
 */
function SidenavController($scope, $element) {

  var self = this;
}
