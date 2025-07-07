export const generateName = (username, locale) => {
    const length = username.length;
  
    if (locale.startsWith('en') && length < 6) return 'Iron Kid';
    if (locale.startsWith('hi') && length > 10) return 'Hindustani Hacker';
    if (length % 2 === 0) return 'Stark Operative';
    return 'Anime Avenger';
  };
  