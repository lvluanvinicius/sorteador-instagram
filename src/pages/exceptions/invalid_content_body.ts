export function errorInvalidContentBody(object: Object, keys: string[]) {
  for (let key of keys) {
    const [keyString, message] = key.split("|");

    if (!Object.keys(object).includes(keyString)) {
      throw new Error(message, {
        cause: "INVALID_CONTENT_BODY",
      });
    }
  }

  const objectAux: { [key: string]: any } = {
    ...object,
  };

  for (let key of keys) {
    const [keyString, message] = key.split("|");

    if (objectAux[keyString] === undefined) {
      throw new Error(message, {
        cause: "INVALID_CONTENT_BODY",
      });
    }
  }
}
