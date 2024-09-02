/**
 * Efetua o sorteio de uma palavra.
 * @param keys
 * @returns
 */
export function sortKeys(keys: string[]): string | null {
  const totalKeys = keys.length; // Recupera o total de items.

  if (totalKeys <= 0) {
    return null;
  }

  const sortIndex = Math.floor(Math.random() * totalKeys);

  return keys[sortIndex];
}

/**
 * Remove as palavras duplicadas.
 * @param keys
 * @returns
 */
export function removeDuplicated(keys: string[]): string[] {
  const keysDuplicated: { [key: string]: boolean } = {};
  const result: string[] = [];

  for (const key of keys) {
    const trimmedKey = key.trim(); // Remove espaços em branco no início e no fim

    // Verifica se a string não está vazia após o trim
    if (trimmedKey && !keysDuplicated[trimmedKey]) {
      keysDuplicated[trimmedKey] = true;
      result.push(trimmedKey);
    }
  }

  return result;
}
