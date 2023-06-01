//receive message

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const selectedText = message.extractText;
  // console.log(selectedText);
  const response = await fetch(
    "https://sameerr007-abstractive-summarization.hf.space/run/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [selectedText],
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const res = data?.data[0];
      chrome.runtime.sendMessage({ res });
    });
  sendResponse({ res: "OK" });
});
