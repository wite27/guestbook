import { GuestBookPage } from './app.po';

describe('guest-book App', () => {
  let page: GuestBookPage;

  beforeEach(() => {
    page = new GuestBookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
