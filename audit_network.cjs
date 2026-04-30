const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Enable network tracking
  await page.setCacheEnabled(false);
  
  const requests = [];
  let navStart = 0;

  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  client.on('Network.requestWillBeSent', (e) => {
    requests.push({
      id: e.requestId,
      url: e.request.url,
      type: e.type,
      startTime: e.timestamp, // in seconds
    });
  });

  client.on('Network.loadingFinished', (e) => {
    const req = requests.find(r => r.id === e.requestId);
    if (req) {
      req.endTime = e.timestamp;
      req.size = e.encodedDataLength;
    }
  });

  client.on('Network.responseReceived', (e) => {
    const req = requests.find(r => r.id === e.requestId);
    if (req) {
      req.status = e.response.status;
    }
  });

  page.on('metrics', (e) => {
    if (e.title === 'NavigationStart') {
      navStart = e.metrics.Timestamp;
    }
  });

  // Load the page
  const startTime = Date.now();
  await page.goto('http://localhost:4174/Portfolio/', { waitUntil: 'networkidle0', timeout: 30000 });
  
  const metrics = await page.metrics();
  
  // Format the results
  const navStartTime = requests[0]?.startTime || (Date.now()/1000); // Approximation if no nav event
  
  const formattedRequests = requests.map(r => ({
    url: r.url.replace('http://localhost:5173', ''),
    type: r.type,
    status: r.status,
    startMs: Math.round((r.startTime - navStartTime) * 1000),
    endMs: r.endTime ? Math.round((r.endTime - navStartTime) * 1000) : null,
    sizeBytes: r.size || 0
  })).sort((a, b) => a.startMs - b.startMs);

  const totalTransfer = formattedRequests.reduce((sum, r) => sum + r.sizeBytes, 0);
  const finishTime = Math.max(...formattedRequests.map(r => r.endMs || 0));

  const perfTiming = JSON.parse(await page.evaluate(() => JSON.stringify(performance.timing)));
  const domContentLoaded = perfTiming.domContentLoadedEventEnd - perfTiming.navigationStart;
  const loadTime = perfTiming.loadEventEnd - perfTiming.navigationStart;

  const report = {
    summary: {
      totalRequests: formattedRequests.length,
      totalTransferSize: totalTransfer,
      finishTimeMs: finishTime,
      domContentLoadedMs: domContentLoaded,
      loadTimeMs: loadTime
    },
    requests: formattedRequests
  };

  fs.writeFileSync('network_audit.json', JSON.stringify(report, null, 2));
  console.log('Audit complete');
  
  await browser.close();
})();
