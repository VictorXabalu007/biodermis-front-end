

export function isValidUrl(string: string): boolean {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.[a-zA-Z]+)(\/[a-zA-Z0-9._-]+)*\/?(\?[a-zA-Z0-9=&_-]+)?(#\S+)?$/;
    return regex.test(string);
  }
  