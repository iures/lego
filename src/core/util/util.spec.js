describe('util', function() {
  beforeEach(module('material.core'));

  var $rootScope, $timeout;
  beforeEach( inject(function(_$rootScope_,_$timeout_) {
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
  }));

  describe('disconnect',function(){
    var disconnectScope, reconnectScope;
    beforeEach(inject(function($mdUtil) {
      disconnectScope = $mdUtil.disconnectScope;
      reconnectScope = $mdUtil.reconnectScope;
    }));

    it('disconnectScope events', inject(function($rootScope) {
      var scope1 = $rootScope.$new();

      var spy = jasmine.createSpy('eventSpy');
      scope1.$on('event', spy);

      disconnectScope(scope1);

      $rootScope.$broadcast('event');
      expect(spy).not.toHaveBeenCalled();

      reconnectScope(scope1);

      $rootScope.$broadcast('event');
      expect(spy).toHaveBeenCalled();
    }));
  });

  describe('nextTick', function () {
    it('should combine multiple calls into a single digest', inject(function ($mdUtil, $rootScope, $timeout) {
      var digestWatchFn = jasmine.createSpy('watchFn');
      var callback = jasmine.createSpy('callback');
      var timeout;
      $rootScope.$watch(digestWatchFn);
      expect(digestWatchFn).not.toHaveBeenCalled();
      expect(callback).not.toHaveBeenCalled();
      //-- Add a bunch of calls to prove that they are batched
      for (var i = 0; i < 10; i++) {
        timeout = $mdUtil.nextTick(callback);
        expect(timeout.$$timeoutId).toBeOfType('number');
      }
      $timeout.flush();
      expect(digestWatchFn).toHaveBeenCalled();
      //-- $digest seems to be called one extra time here
      expect(digestWatchFn.calls.count()).toBe(2);
      //-- but callback is still called more
      expect(callback.calls.count()).toBe(10);
    }));
    it('should return a timeout', inject(function ($mdUtil) {
      var timeout = $mdUtil.nextTick(angular.noop);
      expect(timeout.$$timeoutId).toBeOfType('number');
    }));
    it('should return the same timeout for multiple calls', inject(function ($mdUtil) {
      var a = $mdUtil.nextTick(angular.noop),
          b = $mdUtil.nextTick(angular.noop);
      expect(a).toBe(b);
    }));
  });

  function flush() {
    $rootScope.$digest();
    $timeout.flush();
  }
});
