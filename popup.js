const btn = document.getElementById("toggleBtn");

chrome.storage.local.get(["autoPauseEnabled"], (result) => {
  const isEnabled = result.autoPauseEnabled || false;
  btn.textContent = isEnabled ? "Disable" : "Enable";
});

btn.addEventListener("click", () => {
  chrome.storage.local.get(["autoPauseEnabled"], (result) => {
    const newState = !result.autoPauseEnabled;
    chrome.storage.local.set({ autoPauseEnabled: newState }, () => {
      btn.textContent = newState ? "Disable" : "Enable";
    });
  });
});
