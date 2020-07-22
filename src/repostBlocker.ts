import { getConfigValue } from "./config";

const isStreamUrl = (url: URL) => url && url.hostname === "api-v2.soundcloud.com" && url.pathname === "/stream";

const filterReposts = (collection: any[]) => {
  if (!collection) return [];

  const followedArtistIds = getConfigValue("followed-artists") ?? [];
  const filtered = [];

  for (const item of collection) {
    if (item.type === "track-repost" && !followedArtistIds.includes(item.track.user_id)) {
      continue;
    }

    if (item.type === "playlist-repost" && !followedArtistIds.includes(item.playlist.user_id)) {
      continue;
    }

    filtered.push(item);
  }

  return filtered;
};

const removeReposts = (json: string) => {
  if (!json) return json;

  const data = JSON.parse(json);

  const filteredData = {
    ...data,
    collection: filterReposts(data.collection),
  };

  return JSON.stringify(filteredData);
};

const originalSendMethod = XMLHttpRequest.prototype.send;

function hijackedSendMethod(body: any) {
  const url = new URL(this.__state.url);
  const onload = this.onload;

  if (onload && isStreamUrl(url)) {
    this.onload = function (event) {
      Object.defineProperty(this, "responseText", {
        value: removeReposts(this.responseText),
      });

      onload.call(this, event);
    };
  }

  return originalSendMethod.call(this, body);
}

XMLHttpRequest.prototype.send = hijackedSendMethod;

Object.defineProperty(XMLHttpRequest.prototype, "resetSend", {
  value: () => (XMLHttpRequest.prototype.send = originalSendMethod),
});