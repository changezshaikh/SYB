import { SavingYourBaconPage } from './app.po';

describe('saving-your-bacon App', () => {
  let page: SavingYourBaconPage;

  beforeEach(() => {
    page = new SavingYourBaconPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
