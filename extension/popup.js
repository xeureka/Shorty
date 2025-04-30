document.addEventListener('DOMContentLoaded', function() {
  const shortenBtn = document.getElementById('shorten-btn');
  const resultDiv = document.getElementById('result');
  const shortUrlInput = document.getElementById('short-url');
  const copyBtn = document.getElementById('copy-btn');

  shortenBtn.addEventListener('click', async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;

    // Here you could send the URL to a shortener API. For now, fake it:
    const req = new Request("http://localhost:3000", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:   JSON.stringify({longUrl: url}),
    })

    const resp = await fetch(req)
    const data = await resp.json()

    shortUrlInput.value = data.shortUrl

    resultDiv.classList.remove('hidden');
  });

  copyBtn.addEventListener('click', () => {
    shortUrlInput.select();
    document.execCommand('copy');
  });
});
