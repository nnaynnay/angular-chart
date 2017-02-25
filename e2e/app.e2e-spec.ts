import { AngularChartPage } from './app.po';

describe('angular-chart App', function() {
  let page: AngularChartPage;

  beforeEach(() => {
    page = new AngularChartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
