let isEnabled = false;

function getVideo() {
  return document.querySelector('video');
}

function handleVisibilityChange() {
  const video = getVideo();
  if (!video) return;

  if (document.hidden) {
    video.pause();
  } else {
    video.play().catch(() => {});
  }
}

chrome.storage.local.get(["autoPauseEnabled"], (result) => {
  isEnabled = result.autoPauseEnabled || false;

  if (isEnabled) {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoPauseEnabled) {
    isEnabled = changes.autoPauseEnabled.newValue;

    if (isEnabled) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    } else {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }
});
