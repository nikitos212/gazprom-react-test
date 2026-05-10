import type { PageSize, PaginationMeta } from '../types';

export const pageSizeOptions: PageSize[] = [10, 25, 50];

export const emptyMeta: PaginationMeta = {
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};

export const storageKeys = {
  token: 'gpn:gorest:token',
  mode: 'gpn:gorest:mode',
  userPage: 'gpn:gorest:user-page',
  postPage: 'gpn:gorest:post-page',
  userPageSize: 'gpn:gorest:user-page-size',
  postPageSize: 'gpn:gorest:post-page-size',
  query: 'gpn:gorest:query',
  favoriteUsers: 'gpn:gorest:fav-users',
  favoritePosts: 'gpn:gorest:fav-posts',
  recentItems: 'gpn:gorest:recent',
} as const;
