// utils/fetchLib.ts

// Definição de tipos para métodos HTTP suportados
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Interface para as opções de configuração da função customFetch
interface FetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any; // Pode ser um objeto ou string dependendo do conteúdo enviado
  queryParams?: Record<string, string | number>;
}

// Interface padrão para o retorno da API
declare interface PrismaActionResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

// Classe para erros de fetch
class FetchError extends Error {
  type: "NetworkError" | "HTTPError" | "APIError" | "GeneralError";
  status?: number;

  constructor(
    message: string,
    type: "NetworkError" | "HTTPError" | "APIError" | "GeneralError",
    status?: number
  ) {
    super(message);
    this.name = "FetchError";
    this.type = type;
    this.status = status;
  }
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
): Promise<PrismaActionResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body = null,
    queryParams = {},
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

    // Espera que a API sempre retorne JSON com status, message, e data
    const apiResponse: PrismaActionResponse<T> = await response.json();

    // Lança um erro se o status da API for false
    if (!apiResponse.status) {
      throw new FetchError(apiResponse.message, "APIError", response.status);
    }

    return apiResponse;
  } catch (error) {
    if (error instanceof FetchError) {
      // Se o erro já for um FetchError, lança novamente
      throw error;
    } else if (error instanceof TypeError) {
      // Erros de rede (NetworkError)
      throw new FetchError(
        "Erro de rede ou requisição abortada",
        "NetworkError"
      );
    } else if (error instanceof SyntaxError) {
      // Erros de parsing JSON (geralmente inesperados)
      throw new FetchError(
        "Erro ao processar a resposta da API",
        "GeneralError"
      );
    } else {
      // Outros erros genéricos
      throw new FetchError("Erro desconhecido", "GeneralError");
    }
  }
}

// Funções auxiliares para métodos HTTP comuns
async function get<T = any>(
  url: string,
  options: Omit<FetchOptions, "method"> = {}
): Promise<PrismaActionResponse<T>> {
  return customFetch<T>(url, { ...options, method: "GET" });
}

async function post<T = any>(
  url: string,
  body: any,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<PrismaActionResponse<T>> {
  return customFetch<T>(url, { ...options, method: "POST", body });
}

async function put<T = any>(
  url: string,
  body: any,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<PrismaActionResponse<T>> {
  return customFetch<T>(url, { ...options, method: "PUT", body });
}

async function del<T = any>(
  url: string,
  options: Omit<FetchOptions, "method"> = {}
): Promise<PrismaActionResponse<T>> {
  return customFetch<T>(url, { ...options, method: "DELETE" });
}

// Exporta as funções
export { customFetch, get, post, put, del, FetchError };
