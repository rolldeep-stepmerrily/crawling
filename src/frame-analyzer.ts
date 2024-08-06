import { Frame } from 'puppeteer';

export class FrameAnalyzer {
  constructor(private frame: Frame) {}

  async findBlogName() {
    const frameBlogName = this.frame && (await this.frame.$('#blogTitleName'));

    const blogName = await frameBlogName?.evaluate((node) => {
      return (node as HTMLElement).innerText;
    });

    return blogName;
  }
  async findAuthor() {
    const frameAuthor = this.frame && (await this.frame.$('#nickNameArea'));

    const author = await frameAuthor?.evaluate((node) => {
      return (node as HTMLElement).innerText;
    });

    return author;
  }

  async findContent() {
    const frameContent = this.frame && (await this.frame.$$('span'));

    const content = await Promise.all(
      frameContent.map(async (content) => {
        const text = await content.evaluate((node) => {
          return (node as HTMLElement).innerText;
        });

        return text.trim();
      }),
    );

    return content;
  }

  async findImages() {
    const frameImages = this.frame && (await this.frame.$$('.se-image-resource'));

    const images = await Promise.all(
      frameImages.map(async (image) => {
        return await image.evaluate((node) => {
          return (node as HTMLImageElement).src;
        });
      }),
    );

    return images;
  }
}
