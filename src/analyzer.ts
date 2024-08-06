import { Page } from 'puppeteer';

export class Analyzer {
  constructor(private page: Page) {}

  async findTitle() {
    return await this.page.title();
  }
}
