export const setCookie = (key: string, value: string | number) => {
  let expirationTime = new Date();
  expirationTime = (expirationTime.setTime(
    expirationTime.getTime() + 24 * 60 * 60 * 1000
  ) as unknown) as Date;

  document.cookie = `${key}=${value || ""}${expirationTime}; path=/`;
};

export const getCookie = (cookieKey: string) => {
  let cookieName = `${cookieKey}=`;
  let cookieArray = document.cookie.split(";");
  for (let cookie of cookieArray) {
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=""; max-age=-1`;
};
