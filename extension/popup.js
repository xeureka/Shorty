document.addEventListener('DOMContentLoaded', function() {
  const shortenBtn = document.getElementById('shorten-btn');
  const resultDiv = document.getElementById('result');
  const shortUrlInput = document.getElementById('short-url');
  const copyBtn = document.getElementById('copy-btn');

  shortenBtn.addEventListener('click', async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;

    // Here you could send the URL to a shortener API. For now, fake it:
    shortUrlInput.value = "https://short.url/" + btoa(url).slice(0, 6);
    resultDiv.classList.remove('hidden');
  });

  copyBtn.addEventListener('click', () => {
    shortUrlInput.select();
    document.execCommand('copy');
  });
});
