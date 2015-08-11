describe('mdCard directive', function() {

  beforeEach(module('material.components.card'));

  it('should have the default theme class when the ct-theme attribute is not defined', inject(function($compile, $rootScope) {
    var card = $compile('<ct-card></ct-card>')($rootScope.$new());
    $rootScope.$apply();
    expect(card.hasClass('ct-default-theme')).toBe(true);
  }));

  it('should have the correct theme class when the ct-theme attribute is defined', inject(function($compile, $rootScope) {
    var card = $compile('<ct-card ct-theme="green"></ct-card>')($rootScope.$new());
    $rootScope.$apply();
    expect(card.hasClass('ct-green-theme')).toBe(true);
  }));
});
