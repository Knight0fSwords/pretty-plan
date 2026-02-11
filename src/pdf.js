import puppeteer from 'puppeteer';

export async function generatePdf(html, outputPath, title) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.setJavaScriptEnabled(false);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    await page.pdf({
      path: outputPath,
      format: 'letter',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 9px; font-family: -apple-system, 'Helvetica Neue', sans-serif;
                    color: #999; width: 100%; padding: 5px 40px 0;
                    display: flex; justify-content: space-between;">
          <span>${title}</span>
          <span class="date"></span>
        </div>`,
      footerTemplate: `
        <div style="font-size: 9px; font-family: -apple-system, 'Helvetica Neue', sans-serif;
                    color: #999; width: 100%; text-align: center; padding: 0 40px 5px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>`,
      margin: {
        top: '0.75in',
        bottom: '0.75in',
        left: '0.75in',
        right: '0.75in',
      },
    });
  } finally {
    await browser.close();
  }
}
