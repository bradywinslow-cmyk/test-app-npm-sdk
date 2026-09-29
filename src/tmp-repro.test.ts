describe('window mocks', () => {
  it('mocks requestAnimationFrame', () => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });
});
