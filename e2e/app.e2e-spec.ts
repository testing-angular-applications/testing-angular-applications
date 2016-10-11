import { Chapter4StarterPage } from './app.po';

describe('chapter-4-starter App', function() {
  let page: Chapter4StarterPage;

  beforeEach(() => {
    page = new Chapter4StarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
