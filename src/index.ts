import { FrameAnalyzer } from './frame-analyzer';
import { Crawler } from './crawler';

async function crawl() {
  const crawler = new Crawler();

  try {
    await crawler.initialize();

    await crawler.goto('https://blog.naver.com/realmandinaeyong/223227817431');

    const page = crawler.findPage();

    if (!page) {
      throw new Error('Failed to get page');
    }

    await page.waitForFrame(async (frame) => {
      return frame.url().includes('PostView');
    });

    const frame = page.mainFrame().childFrames()[0];

    const analyzer = new FrameAnalyzer(frame);

    const blogName = await analyzer.findBlogName();

    const author = await analyzer.findAuthor();

    const title = await page.title();

    const content = await analyzer.findContent();

    const images = await analyzer.findImages();

    console.log({ blogName, author, title, content, images });
  } catch (e) {
    console.error(e);

    throw new Error('failed to crawl');
  } finally {
    await crawler.close();
  }
}

crawl();
