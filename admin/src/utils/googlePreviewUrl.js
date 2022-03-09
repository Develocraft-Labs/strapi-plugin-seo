import limitString from "./limitString";
const MOBILE = "mobile";
const DESKTOP = "desktop";

/**
 * Shorten url and return it to match Googles preview in search results.
 * @param {String} string - Url.
 * @param {String} viewPort - mobile | desktop.
 * @returns {String} - Google preview Url.
 */
const shortenPreviewUrl = (string, viewPort) => {
  if (!string) return string;
  if (!string.includes("https://")) return "https://www.yourdomain.com/subpage";

  const urlSubStrings = string.split("/");
  const domain =
    urlSubStrings && urlSubStrings[2] && urlSubStrings[2].split(".")[1];
  const firstQuery = urlSubStrings[3];
  const secondQuery = urlSubStrings[4];

  if (viewPort === MOBILE) {
    let middle = "";
    let last = "";

    if (firstQuery) middle = `> ${firstQuery}`;
    if (secondQuery) last = `> ${limitString(secondQuery, 0, 3)}`;

    return `${domain} ${middle ? middle : ""} ${last ? last : ""}`;
  }
  if (viewPort === DESKTOP) {
    let middle = "";
    let last = "";

    if (firstQuery) middle = `/${firstQuery}`;
    if (secondQuery) last = `/${secondQuery}`;

    return `${domain}${middle ? middle : ""}${last ? last : ""}`;
  }

  return "https://www.yourdomain.com/subpage";
};

export default shortenPreviewUrl;
