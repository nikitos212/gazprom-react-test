import type { Post } from '../../types';
import { EmptyRows, SkeletonRows } from './TableStates';

type PostsTableProps = {
  posts: Post[];
  isLoading: boolean;
  favoritePosts: number[];
  onFavorite: (id: number) => void;
  onOpen: (post: Post) => void;
};

export const PostsTable = ({
  posts,
  isLoading,
  favoritePosts,
  onFavorite,
  onOpen,
}: PostsTableProps) => (
  <div className="table-wrap">
    <table className="data-table data-table--posts">
      <thead>
        <tr>
          <th>ID</th>
          <th>Заголовок</th>
          <th>Автор</th>
          <th aria-label="Избранное" />
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <SkeletonRows columns={4} />
        ) : posts.length ? (
          posts.map((post) => {
            const isFavorite = favoritePosts.includes(post.id);

            return (
              <tr
                key={post.id}
                tabIndex={0}
                onClick={() => onOpen(post)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onOpen(post);
                  }
                }}
              >
                <td>
                  <strong>#{post.id}</strong>
                </td>
                <td>
                  <strong>{post.title}</strong>
                  <span>{post.body}</span>
                </td>
                <td>user #{post.user_id}</td>
                <td>
                  <button
                    className={`icon-action ${isFavorite ? 'icon-action--active' : ''}`}
                    type="button"
                    title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                    onClick={(event) => {
                      event.stopPropagation();
                      onFavorite(post.id);
                    }}
                  >
                    ★
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <EmptyRows columns={4} text="На этой странице нет совпадений с фильтром." />
        )}
      </tbody>
    </table>
  </div>
);
