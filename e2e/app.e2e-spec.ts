import { HackPSUS2018AdminPage } from './app.po';

describe('hack-psus2018-admin App', () => {
  let page: HackPSUS2018AdminPage;

  beforeEach(() => {
    page = new HackPSUS2018AdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
