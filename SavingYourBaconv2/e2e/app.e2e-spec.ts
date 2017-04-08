import { SavingYourBaconv2Page } from './app.po';

describe('saving-your-baconv2 App', () => {
  let page: SavingYourBaconv2Page;

  beforeEach(() => {
    page = new SavingYourBaconv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
