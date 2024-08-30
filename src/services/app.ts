// utils/fetchLib.ts

// Definição de tipos para métodos HTTP suportados
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Interface para as opções de configuração da função customFetch
interface FetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any; // Pode ser um objeto ou string dependendo do conteúdo enviado
  queryParams?: Record<string, string | number>;
  responseType?: "json" | "text";
}

// Função para criar URLs com parâmetros de consulta
function createURLWithQueryParams(
  url: string,
  queryParams: Record<string, string | number> = {}
): string {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  return query ? `${url}?${query}` : url;
}

// Função principal customFetch
async function customFetch<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body = null,
    queryParams = {},
    responseType = "json",
    ...rest
  } = options;

  // Criação da URL completa com parâmetros de consulta
  const fullUrl = createURLWithQueryParams(url, queryParams);

  // Configuração das opções para a função fetch
  const fetchOptions: RequestInit = {
    method,
    headers,
    ...rest,
  };

  // Adiciona o corpo da requisição se necessário
  if (body) {
    fetchOptions.body = JSON.stringify(body);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    // Retorna a resposta baseada no tipo especificado (json, text, etc.)
    return responseType === "json"
      ? await response.json()
      : ((await response.text()) as T);
  } catch (error) {
    console.error("Erro no fetch:", error);
    throw error;
  }
}

// Funções auxiliares para métodos HTTP comuns
async function get<T = any>(
  url: string,
  options: Omit<FetchOptions, "method"> = {}
): Promise<T> {
  return customFetch<T>(url, { ...options, method: "GET" });
}

async function post<T = any>(
  url: string,
  body: any,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<T> {
  return customFetch<T>(url, { ...options, method: "POST", body });
}

async function put<T = any>(
  url: string,
  body: any,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<T> {
  return customFetch<T>(url, { ...options, method: "PUT", body });
}

async function del<T = any>(
  url: string,
  options: Omit<FetchOptions, "method"> = {}
): Promise<T> {
  return customFetch<T>(url, { ...options, method: "DELETE" });
}

// Exporta as funções
export { customFetch, get, post, put, del };
