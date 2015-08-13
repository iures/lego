describe('mdCard directive', function() {

  beforeEach(module('ct.components.card'));

  it('should have the default theme class when the ct-theme attribute is not defined', inject(function($compile, $rootScope) {
    var card = $compile('<ct-card></ct-card>')($rootScope.$new());
    $rootScope.$apply();
    expect(card.hasClass('md-default-theme')).toBe(true);
  }));

  it('should have the correct theme class when the ct-theme attribute is defined', inject(function($compile, $rootScope) {
    var card = $compile('<ct-card md-theme="green"></ct-card>')($rootScope.$new());
    $rootScope.$apply();
    expect(card.hasClass('md-green-theme')).toBe(true);
  }));
});
