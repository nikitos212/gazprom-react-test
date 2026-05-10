import { useEffect, useState } from 'react';
import { api } from '../api';
import type { AppRoute, DetailState, RecentItem } from '../types';

type UseDetailDataParams = {
  route: AppRoute;
  hasToken: boolean;
  token: string;
  rememberRecent: (item: Omit<RecentItem, 'visitedAt'>) => void;
};

export const useDetailData = ({ route, hasToken, token, rememberRecent }: UseDetailDataParams) => {
  const [detailState, setDetailState] = useState<DetailState>({ status: 'idle' });

  useEffect(() => {
    if (route.kind === 'home') {
      setDetailState({ status: 'idle' });
      return;
    }

    if (!hasToken) {
      setDetailState({ status: 'error', error: 'Введите access token, чтобы открыть карточку.' });
      return;
    }

    const controller = new AbortController();
    setDetailState({ status: 'loading' });

    const loadDetails = async () => {
      if (route.kind === 'user') {
        const [user, userPosts] = await Promise.all([
          api.getUser(route.id, { token, signal: controller.signal }),
          api.getUserPosts(route.id, { token, signal: controller.signal }),
        ]);

        rememberRecent({ id: user.id, kind: 'users', title: user.name });
        setDetailState({ status: 'user', user, posts: userPosts });
        return;
      }

      const [post, comments] = await Promise.all([
        api.getPost(route.id, { token, signal: controller.signal }),
        api.getPostComments(route.id, { token, signal: controller.signal }),
      ]);

      rememberRecent({ id: post.id, kind: 'posts', title: post.title });
      setDetailState({ status: 'post', post, comments });
    };

    loadDetails().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setDetailState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Не удалось открыть карточку',
      });
    });

    return () => controller.abort();
  }, [hasToken, rememberRecent, route, token]);

  return detailState;
};
