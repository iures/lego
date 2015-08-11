describe('ct-button', function() {

  beforeEach(module('material.components.button'));

  it('should convert attributes on an ct-button to attributes on the generated button', inject(function($compile, $rootScope) {
    var button = $compile('<ct-button hide hide-sm></ct-button>')($rootScope);
    $rootScope.$apply();
    expect(button[0].hasAttribute('hide')).toBe(true);
    expect(button[0].hasAttribute('hide-sm')).toBe(true);
  }));

  it('should expect an aria-label if element has no text', inject(function($compile, $rootScope, $log) {
    spyOn($log, 'warn');
    var button = $compile('<ct-button></ct-button>')($rootScope);
    $rootScope.$apply();
    expect($log.warn).toHaveBeenCalled();

    $log.warn.calls.reset();
    button = $compile('<ct-button aria-label="something"></ct-button>')($rootScope);
    $rootScope.$apply();
    expect($log.warn).not.toHaveBeenCalled();
  }));

  it('should allow attribute directive syntax', inject(function($compile, $rootScope) {
    var button = $compile('<a ct-button href="https://google.com">google</a>')($rootScope.$new());
    expect(button.hasClass('ct-button')).toBe(true);
  }));

  it('should not set focus state on mousedown', inject(function ($compile, $rootScope){
    var button = $compile('<ct-button>')($rootScope.$new());
    $rootScope.$apply();
    button.triggerHandler('mousedown');
    expect(button[0]).not.toHaveClass('ct-focused');
  }));

  it('should set focus state on focus and remove on blur', inject(function ($compile, $rootScope){
    var button = $compile('<ct-button>')($rootScope.$new());
    $rootScope.$apply();
    button.triggerHandler('focus');
    expect(button[0]).toHaveClass('ct-focused');
    button.triggerHandler('blur');
    expect(button[0]).not.toHaveClass('ct-focused');
  }));

  describe('with href or ng-href', function() {

    it('should be anchor if href attr', inject(function($compile, $rootScope) {
      var button = $compile('<ct-button href="/link">')($rootScope.$new());
      $rootScope.$apply();
      expect(button[0].tagName.toLowerCase()).toEqual('a');
    }));

    it('should be anchor if ng-href attr', inject(function($compile, $rootScope) {
      var button = $compile('<ct-button ng-href="/link">')($rootScope.$new());
      $rootScope.$apply();
      expect(button[0].tagName.toLowerCase()).toEqual('a');
    }));

    it('should be anchor if ui-sref attr', inject(function($compile, $rootScope) {
      var button = $compile('<ct-button ui-sref="state">')($rootScope.$new());
      $rootScope.$apply();
      expect(button[0].tagName.toLowerCase()).toEqual('a');
    }));

    it('should be anchor if ng-link attr', inject(function($compile, $rootScope) {
      var button = $compile('<ct-button ng-link="component">')($rootScope.$new());
      $rootScope.$apply();
      expect(button[0].tagName.toLowerCase()).toEqual('a');
    }));

    it('should be button otherwise', inject(function($compile, $rootScope) {
      var button = $compile('<ct-button>')($rootScope.$new());
      $rootScope.$apply();
      expect(button[0].tagName.toLowerCase()).toEqual('button');
    }));

  });


  describe('with ng-disabled', function() {

    it('should not set `tabindex` when used without anchor attributes', inject(function ($compile, $rootScope, $timeout) {
      var scope = angular.extend( $rootScope.$new(), { isDisabled : true } );
      var button = $compile('<ct-button ng-disabled="isDisabled">button</ct-button>')(scope);
      $rootScope.$apply();

      expect(button[0].hasAttribute('tabindex')).toBe(false);
    }));

    it('should set `tabindex == -1` when used with href', inject(function ($compile, $rootScope, $timeout) {
      var scope = angular.extend( $rootScope.$new(), { isDisabled : true } );
      var button = $compile('<ct-button ng-disabled="isDisabled" href="#nowhere">button</ct-button>')(scope);

      $rootScope.$apply();
      expect(button.attr('tabindex')).toBe("-1");

      $rootScope.$apply(function(){
        scope.isDisabled = false;
      });
      expect(button.attr('tabindex')).toBe("0");

    }));

    it('should set `tabindex == -1` when used with ng-href', inject(function ($compile, $rootScope, $timeout) {
      var scope = angular.extend( $rootScope.$new(), { isDisabled : true, url : "http://material.angularjs.org" });
      var button = $compile('<ct-button ng-disabled="isDisabled" ng-href="url">button</ct-button>')(scope);
      $rootScope.$apply();

      expect(button.attr('tabindex')).toBe("-1");
    }));

    it('should not trigger click on button when disabled', inject(function ($compile, $rootScope) {
      var clicked = false;
      var onClick = function(){ clicked = true;};
      var scope   = angular.extend( $rootScope.$new(), { isDisabled : true, onClick : onClick} );

      var element = $compile('<ct-button ng-disabled="isDisabled" ng-click="onClick()">button</ct-button>')(scope);
      $rootScope.$apply();

      element.find('button').triggerHandler('click');
      expect(clicked).toBe(false);
    }));

    it('should not trigger click on anchor when disabled', inject(function ($compile, $rootScope) {
      var clicked = false;
      var onClick = function(){ clicked = true;};
      var scope   = angular.extend( $rootScope.$new(), { isDisabled : true, onClick : onClick} );

      var element = $compile('<ct-button ng-disabled="isDisabled" ng-href="#" ng-click="onClick()">button</ct-button>')(scope);
      $rootScope.$apply();

      element.find('a').triggerHandler('click');
      expect(clicked).toBe(false);
    }));

  });

});
