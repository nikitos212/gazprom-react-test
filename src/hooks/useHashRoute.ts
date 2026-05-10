import { useEffect, useState } from 'react';
import type { AppRoute } from '../types';

const parseHash = (): AppRoute => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [resource, id] = hash.split('/');
  const numericId = Number(id);

  if (resource === 'users' && Number.isFinite(numericId) && numericId > 0) {
    return { kind: 'user', id: numericId };
  }

  if (resource === 'posts' && Number.isFinite(numericId) && numericId > 0) {
    return { kind: 'post', id: numericId };
  }

  return { kind: 'home' };
};

export const useHashRoute = () => {
  const [route, setRoute] = useState<AppRoute>(() => parseHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
};

export const navigateHome = () => {
  window.location.hash = '/';
};

export const navigateToUser = (id: number) => {
  window.location.hash = `/users/${id}`;
};

export const navigateToPost = (id: number) => {
  window.location.hash = `/posts/${id}`;
};
