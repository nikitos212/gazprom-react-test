import { EmptyState } from '../EmptyState';
import type { PageSize, PaginationMeta, Post, User, ViewMode } from '../../types';
import { Pagination } from './Pagination';
import { PostsTable } from './PostsTable';
import { UsersTable } from './UsersTable';

type ListPanelProps = {
  mode: ViewMode;
  meta: PaginationMeta;
  hasToken: boolean;
  listError: string;
  isLoading: boolean;
  activePage: number;
  activePageSize: PageSize;
  users: User[];
  posts: Post[];
  favoriteUsers: number[];
  favoritePosts: number[];
  onModeChange: (mode: ViewMode) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSize) => void;
  onFavoriteUser: (id: number) => void;
  onFavoritePost: (id: number) => void;
  onOpenUser: (user: User) => void;
  onOpenPost: (post: Post) => void;
};

export const ListPanel = ({
  mode,
  meta,
  hasToken,
  listError,
  isLoading,
  activePage,
  activePageSize,
  users,
  posts,
  favoriteUsers,
  favoritePosts,
  onModeChange,
  onPageChange,
  onPageSizeChange,
  onFavoriteUser,
  onFavoritePost,
  onOpenUser,
  onOpenPost,
}: ListPanelProps) => (
  <section className="data-panel" aria-label="Списки данных">
    <div className="panel-toolbar">
      <div className="segmented" role="tablist" aria-label="Режим отображения">
        <button
          className={mode === 'users' ? 'segmented__item segmented__item--active' : 'segmented__item'}
          type="button"
          role="tab"
          aria-selected={mode === 'users'}
          onClick={() => onModeChange('users')}
        >
          Пользователи
        </button>
        <button
          className={mode === 'posts' ? 'segmented__item segmented__item--active' : 'segmented__item'}
          type="button"
          role="tab"
          aria-selected={mode === 'posts'}
          onClick={() => onModeChange('posts')}
        >
          Посты
        </button>
      </div>

      <div className="toolbar-summary">
        <span>{meta.total.toLocaleString('ru-RU')} записей</span>
        <span>Страница {activePage}</span>
      </div>
    </div>

    {!hasToken ? (
      <EmptyState title="Нужен access token" text="Запросы к GoRest доступны после ввода токена." />
    ) : listError ? (
      <EmptyState title="API вернул ошибку" text={listError} />
    ) : (
      <>
        {mode === 'users' ? (
          <UsersTable
            users={users}
            isLoading={isLoading}
            favoriteUsers={favoriteUsers}
            onFavorite={onFavoriteUser}
            onOpen={onOpenUser}
          />
        ) : (
          <PostsTable
            posts={posts}
            isLoading={isLoading}
            favoritePosts={favoritePosts}
            onFavorite={onFavoritePost}
            onOpen={onOpenPost}
          />
        )}

        <Pagination
          page={activePage}
          pageSize={activePageSize}
          meta={meta}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </>
    )}
  </section>
);
