describe('ct-card', function() {
  beforeEach(module('material.components.card'));

  it('should convert attributes on an ct-card to attributes on the generated card', inject(function($compile, $rootScope) {
    var card = $compile('<ct-card hide hide-sm></ct-card>')($rootScope);
    $rootScope.$apply();
    expect(button[0].hasAttribute('hide')).toBe(true);
    expect(button[0].hasAttribute('hide-sm')).toBe(true);
  }));
});
