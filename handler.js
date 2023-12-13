const chromium = require('chrome-aws-lambda');

module.exports.generatePdf = async (event) => {
  const html = event.body; // Assuming the HTML is passed in the request body
  console.log(html,'===>>><<<')
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/pdf' },
    body: pdfBuffer.toString('base64'),
    isBase64Encoded: true,
  };
};
