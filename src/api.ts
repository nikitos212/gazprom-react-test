import type { Comment, PaginatedResponse, PaginationMeta, Post, User } from './types';

const BASE_URL = 'https://gorest.co.in/public/v2';

type RequestOptions = {
  token: string;
  signal?: AbortSignal;
  params?: Record<string, string | number>;
};

const defaultMeta: PaginationMeta = {
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};

const readNumberHeader = (headers: Headers, key: string, fallback: number) => {
  const value = Number(headers.get(key));
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

const buildUrl = (path: string, params?: RequestOptions['params']) => {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
};

const buildHeaders = (token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
  });

  if (token.trim()) {
    headers.set('Authorization', `Bearer ${token.trim()}`);
  }

  return headers;
};

const getErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as unknown;

    if (Array.isArray(payload)) {
      return payload
        .map((item) => {
          if (typeof item === 'object' && item && 'message' in item) {
            return String(item.message);
          }

          return String(item);
        })
        .join(', ');
    }

    if (typeof payload === 'object' && payload && 'message' in payload) {
      return String(payload.message);
    }
  } catch {
    return response.statusText;
  }

  return response.statusText;
};

const request = async <T>(path: string, options: RequestOptions): Promise<T> => {
  const response = await fetch(buildUrl(path, options.params), {
    headers: buildHeaders(options.token),
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`GoRest ${response.status}: ${await getErrorMessage(response)}`);
  }

  return response.json() as Promise<T>;
};

const requestPaginated = async <T>(
  path: string,
  options: RequestOptions,
): Promise<PaginatedResponse<T>> => {
  const response = await fetch(buildUrl(path, options.params), {
    headers: buildHeaders(options.token),
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`GoRest ${response.status}: ${await getErrorMessage(response)}`);
  }

  const data = (await response.json()) as T[];
  const limit = readNumberHeader(response.headers, 'x-pagination-limit', defaultMeta.limit);
  const page = readNumberHeader(response.headers, 'x-pagination-page', defaultMeta.page);

  return {
    data,
    meta: {
      total: readNumberHeader(response.headers, 'x-pagination-total', data.length),
      pages: readNumberHeader(response.headers, 'x-pagination-pages', 1),
      page,
      limit,
    },
  };
};

export const api = {
  getUsers: (options: RequestOptions) => requestPaginated<User>('/users', options),
  getPosts: (options: RequestOptions) => requestPaginated<Post>('/posts', options),
  getUser: (id: number, options: RequestOptions) => request<User>(`/users/${id}`, options),
  getPost: (id: number, options: RequestOptions) => request<Post>(`/posts/${id}`, options),
  getUserPosts: (id: number, options: RequestOptions) =>
    request<Post[]>(`/users/${id}/posts`, options),
  getPostComments: (id: number, options: RequestOptions) =>
    request<Comment[]>(`/posts/${id}/comments`, options),
};
