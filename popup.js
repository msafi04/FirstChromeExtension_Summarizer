let getTexts = document.getElementById("getText");

//receive message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.res) {
    console.log("From BG: ", message.res);
    const showText = document.getElementById("showText");
    const span = document.createElement("span");
    showText.appendChild(span);
    span.innerHTML = message.res;
  } else {
    console.log("From BG: Loading...");
    const showText = document.getElementById("showText");
    const span = document.createElement("span");
    showText.appendChild(span);
    span.innerHTML = "Loading ...";
  }
});

getTexts.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getTextFromPage,
  });
});

const getTextFromPage = async () => {
  if (window.getSelection().toString().length) {
    let extractText = window.getSelection().toString();
    // send message
    if (extractText.length > 10) {
      console.log(extractText);
      await chrome.runtime.sendMessage({ extractText });
    }
  }
  // document.addEventListener("selectionchange", async (e) => {
  //   let selectedText = window.getSelection().toString();
  //   console.log("Selected: ", selectedText);
  //   // send message
  //   if (selectedText.length > 0) {
  //     await chrome.runtime.sendMessage({ selectedText });
  //   }
  // });
};
