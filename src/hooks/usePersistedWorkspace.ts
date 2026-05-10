import { useCallback } from 'react';
import { storageKeys } from '../constants/dashboard';
import type { PageSize, RecentItem, ViewMode } from '../types';
import { navigateHome } from './useHashRoute';
import { useLocalStorage } from './useLocalStorage';

export const usePersistedWorkspace = () => {
  const [token, setToken] = useLocalStorage(storageKeys.token, '');
  const [mode, setMode] = useLocalStorage<ViewMode>(storageKeys.mode, 'users');
  const [userPage, setUserPage] = useLocalStorage(storageKeys.userPage, 1);
  const [postPage, setPostPage] = useLocalStorage(storageKeys.postPage, 1);
  const [userPageSize, setUserPageSize] = useLocalStorage<PageSize>(storageKeys.userPageSize, 10);
  const [postPageSize, setPostPageSize] = useLocalStorage<PageSize>(storageKeys.postPageSize, 10);
  const [query, setQuery] = useLocalStorage(storageKeys.query, '');
  const [favoriteUsers, setFavoriteUsers] = useLocalStorage<number[]>(
    storageKeys.favoriteUsers,
    [],
  );
  const [favoritePosts, setFavoritePosts] = useLocalStorage<number[]>(
    storageKeys.favoritePosts,
    [],
  );
  const [recentItems, setRecentItems] = useLocalStorage<RecentItem[]>(
    storageKeys.recentItems,
    [],
  );

  const trimmedToken = token.trim();
  const hasToken = trimmedToken.length > 0;
  const activePage = mode === 'users' ? userPage : postPage;
  const activePageSize = mode === 'users' ? userPageSize : postPageSize;
  const favoriteCount = favoriteUsers.length + favoritePosts.length;

  const rememberRecent = useCallback(
    (item: Omit<RecentItem, 'visitedAt'>) => {
      setRecentItems((items) => {
        const nextItem: RecentItem = {
          ...item,
          visitedAt: new Date().toISOString(),
        };

        return [
          nextItem,
          ...items.filter((recent) => recent.kind !== item.kind || recent.id !== item.id),
        ].slice(0, 5);
      });
    },
    [setRecentItems],
  );

  const toggleFavoriteUser = (id: number) => {
    setFavoriteUsers((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  const toggleFavoritePost = (id: number) => {
    setFavoritePosts((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  const setActivePage = (page: number, totalPages: number) => {
    const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

    if (mode === 'users') {
      setUserPage(safePage);
      return;
    }

    setPostPage(safePage);
  };

  const setActivePageSize = (size: PageSize) => {
    if (mode === 'users') {
      setUserPageSize(size);
      setUserPage(1);
      return;
    }

    setPostPageSize(size);
    setPostPage(1);
  };

  const resetWorkspace = () => {
    setToken('');
    setMode('users');
    setUserPage(1);
    setPostPage(1);
    setUserPageSize(10);
    setPostPageSize(10);
    setQuery('');
    setFavoriteUsers([]);
    setFavoritePosts([]);
    setRecentItems([]);
    navigateHome();
  };

  return {
    token,
    trimmedToken,
    hasToken,
    mode,
    activePage,
    activePageSize,
    query,
    favoriteUsers,
    favoritePosts,
    favoriteCount,
    recentItems,
    setToken,
    setMode,
    setQuery,
    rememberRecent,
    resetWorkspace,
    setActivePage,
    setActivePageSize,
    toggleFavoriteUser,
    toggleFavoritePost,
  };
};
