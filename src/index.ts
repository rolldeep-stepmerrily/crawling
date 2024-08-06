import { Analyzer } from './analyzer';
import { Crawler } from './crawler';

async function crawl() {
  const crawler = new Crawler();

  try {
    await crawler.initialize();

    await crawler.goto('https://nestjs.com/');

    const page = crawler.findPage();

    if (!page) {
      throw new Error('Failed to get page');
    }

    const analyzer = new Analyzer(page);

    const title = await analyzer.findTitle();
    console.log(title);

    const pageHeader = await page.$('.page-header');

    await pageHeader?.screenshot({ path: 'page-header.png', omitBackground: true });
  } catch (e) {
    console.error(e);

    throw new Error('failed to crawl');
  } finally {
    await crawler.close();
  }
}

crawl();
