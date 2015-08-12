/**
 *
 * Angular-ct-Mocks
 *
 * Developers interested in running their own custom unit tests WITH angular-ct.js loaded...
 * must also include this *mocks* file. Similar to `angular-mocks.js`, `ct-mocks.js`
 * will override and disable specific ct performance settings:
 *
 *  - Disabled Theme CSS rule generations
 *  - Forces $mdAria.expectWithText() to be synchronous
 *  - Mocks $$rAF.throttle()
 *  - Captures flush exceptions from $$rAF
 *
 */
(function(window, angular, undefined) {

'use strict';

/**
 * @ngdoc module
 * @name ct-mock
 * @packageName ct-mocks
 *
 * @description
 *
 * The `ct-mock` module provides support
 *
 */
angular.module('ct-mock', ['ngMock', 'ct.core'])
       .config(['$provide', function($provide) {

    /**
      * ct dynamically generates Style tags
      * based on themes and palletes; for each ng-app.
      *
      * For testing, we want to disable generation and
      * <style> DOM injections. So we clear the huge THEME
      * styles while testing...
      */
     $provide.constant('$MD_THEME_CSS', '/**/');

    /**
     * Intercept to make .expectWithText() to be synchronous
     */
    $provide.decorator('$mdAria', function($delegate){

      $delegate.expectWithText = function(element, attrName){
        $delegate.expect(element, attrName, element.text().trim());
      };

      return $delegate;
    });

    /**
     * Add throttle() and wrap .flush() to catch `no callbacks present`
     * errors
     */
    $provide.decorator('$$rAF', function throttleInjector($delegate){

      $delegate.throttle = function(cb) {
        return function() {
          cb.apply(this, arguments);
        };
      };

      var ngFlush = $delegate.flush;
      $delegate.flush = function() {
          try      { ngFlush();  }
          catch(e) { ;           }
      };

      return $delegate;
    });

    /**
     * Capture $timeout.flush() errors: "No deferred tasks to be flushed"
     * errors
     */
    $provide.decorator('$timeout', function throttleInjector($delegate){

      var ngFlush = $delegate.flush;
      $delegate.flush = function() {
          var args = Array.prototype.slice.call(arguments);
          try      { ngFlush.apply($delegate, args);  }
          catch(e) { ;           }
      };

      return $delegate;
    });

  }]);

})(window, window.angular);
