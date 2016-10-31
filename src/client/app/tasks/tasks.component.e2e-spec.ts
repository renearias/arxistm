describe('Tasks', () => {

  beforeEach( () => {
    browser.get('/tasks');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-tasks h2')).getText()).toEqual('Tareas');
  });

});
