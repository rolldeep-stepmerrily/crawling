import puppeteer, { Browser, Page } from 'puppeteer';

export class Crawler {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async goto(url: string): Promise<void> {
    if (!this.page) {
      throw new Error('browser not initialized');
    }

    await this.page.goto(url);
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  findPage(): Page | null {
    return this.page;
  }
}
