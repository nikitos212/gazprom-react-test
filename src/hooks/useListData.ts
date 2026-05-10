import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { emptyMeta } from '../constants/dashboard';
import { includesQuery } from '../lib/dashboardUtils';
import type { AppRoute, PageSize, PaginationMeta, Post, User, ViewMode } from '../types';

type UseListDataParams = {
  routeKind: AppRoute['kind'];
  hasToken: boolean;
  token: string;
  mode: ViewMode;
  activePage: number;
  activePageSize: PageSize;
  query: string;
};

export const useListData = ({
  routeKind,
  hasToken,
  token,
  mode,
  activePage,
  activePageSize,
  query,
}: UseListDataParams) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(emptyMeta);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (routeKind !== 'home') {
      return;
    }

    if (!hasToken) {
      setUsers([]);
      setPosts([]);
      setMeta(emptyMeta);
      setError('');
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError('');

    const load = async () => {
      const params = {
        page: activePage,
        per_page: activePageSize,
      };

      if (mode === 'users') {
        const response = await api.getUsers({
          token,
          params,
          signal: controller.signal,
        });
        setUsers(response.data);
        setMeta(response.meta);
        return;
      }

      const response = await api.getPosts({
        token,
        params,
        signal: controller.signal,
      });
      setPosts(response.data);
      setMeta(response.meta);
    };

    load()
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return;
        }

        setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить данные');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [activePage, activePageSize, hasToken, mode, routeKind, token]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        includesQuery([user.name, user.email, user.gender, user.status], query),
      ),
    [query, users],
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        includesQuery([String(post.id), String(post.user_id), post.title, post.body], query),
      ),
    [posts, query],
  );

  return {
    users: filteredUsers,
    posts: filteredPosts,
    meta,
    isLoading,
    error,
  };
};
