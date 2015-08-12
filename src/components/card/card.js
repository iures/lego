/**
 * @ngdoc module
 * @name ct.components.card
 *
 * @description
 * Card components.
 */
angular.module('ct.components.card', [
  'ct.core'
])
  .directive('ctCard', ctCardDirective);



/**
 * @ngdoc directive
 * @name mdCard
 * @module ct.components.card
 *
 * @restrict E
 *
 * @description
 * The `<ct-card>` directive is a container element used within `<ct-content>` containers.
 *
 * An image included as a direct descendant will fill the card's width, while the `<ct-card-content>`
 * container will wrap text content and provide padding. An `<ct-card-footer>` element can be
 * optionally included to put content flush against the bottom edge of the card.
 *
 * Action buttons can be included in an element with the `.ct-actions` class, also used in `ct-dialog`.
 * You can then position buttons using layout attributes.
 *
 * Cards have constant width and variable heights; where the maximum height is limited to what can
 * fit within a single view on a platform, but it can temporarily expand as needed.
 *
 * @usage
 * ###Card with optional footer
 * <hljs lang="html">
 * <ct-card>
 *  <img src="card-image.png" class="ct-card-image" alt="image caption">
 *  <ct-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </ct-card-content>
 *  <ct-card-footer>
 *    Card footer
 *  </ct-card-footer>
 * </ct-card>
 * </hljs>
 *
 * ###Card with actions
 * <hljs lang="html">
 * <ct-card>
 *  <img src="card-image.png" class="ct-card-image" alt="image caption">
 *  <ct-card-content>
 *    <h2>Card headline</h2>
 *    <p>Card content</p>
 *  </ct-card-content>
 *  <div class="ct-actions" layout="row" layout-align="end center">
 *    <ct-button>Action 1</ct-button>
 *    <ct-button>Action 2</ct-button>
 *  </div>
 * </ct-card>
 * </hljs>
 *
 */
function ctCardDirective($mdTheming, $compile) {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      //use style background-image instead of img src
      var currentImg = $('.ct-card-image', $element);
      var imgSrc = currentImg.attr('ng-src');
      var wrappedImg = angular.element(
        "<div class=\"ct-card-image-wrapper\"> \n" +
        "  <div class=\"ct-card-image\" style=\"background-image:url('"+ imgSrc +"')\"></div> \n" +
        "</div>"
      );
      currentImg.replaceWith($compile(wrappedImg)($scope));

      $mdTheming($element);
    }
  };
}
