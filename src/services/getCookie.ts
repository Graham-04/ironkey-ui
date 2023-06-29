export const getCookie = (name: string) => {
  let cookies = document.cookie;
  let found = null;
  cookies = cookies.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name)) {
      cookie = cookie.split("=");
      return cookie[1];
    }
  }

  return null;
};
