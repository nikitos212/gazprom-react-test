import { Button } from '@consta/uikit/Button';
import { navigateHome, navigateToPost } from '../../hooks/useHashRoute';
import type { DetailState } from '../../types';
import { EmptyState } from '../EmptyState';

type DetailPanelProps = {
  state: DetailState;
  favoriteUsers: number[];
  favoritePosts: number[];
  onFavoriteUser: (id: number) => void;
  onFavoritePost: (id: number) => void;
};

export const DetailPanel = ({
  state,
  favoriteUsers,
  favoritePosts,
  onFavoriteUser,
  onFavoritePost,
}: DetailPanelProps) => {
  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <section className="detail-panel">
        <div className="detail-skeleton" />
      </section>
    );
  }

  if (state.status === 'error') {
    return (
      <section className="detail-panel">
        <Button label="Вернуться к списку" view="secondary" size="m" onClick={navigateHome} />
        <EmptyState title="Карточка не открылась" text={state.error} />
      </section>
    );
  }

  if (state.status === 'user') {
    const isFavorite = favoriteUsers.includes(state.user.id);

    return (
      <section className="detail-panel">
        <div className="detail-head">
          <Button label="Вернуться к списку" view="secondary" size="m" onClick={navigateHome} />
          <button
            className={`favorite-pill ${isFavorite ? 'favorite-pill--active' : ''}`}
            type="button"
            onClick={() => onFavoriteUser(state.user.id)}
          >
            ★ {isFavorite ? 'В избранном' : 'В избранное'}
          </button>
        </div>

        <article className="profile-card">
          <div className="avatar" aria-hidden="true">
            {state.user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="eyebrow">Пользователь #{state.user.id}</p>
            <h2>{state.user.name}</h2>
            <dl className="info-grid">
              <div>
                <dt>Email</dt>
                <dd>{state.user.email}</dd>
              </div>
              <div>
                <dt>Пол</dt>
                <dd>{state.user.gender === 'female' ? 'Женский' : 'Мужской'}</dd>
              </div>
              <div>
                <dt>Статус</dt>
                <dd>{state.user.status === 'active' ? 'Активен' : 'Неактивен'}</dd>
              </div>
              <div>
                <dt>Постов</dt>
                <dd>{state.posts.length}</dd>
              </div>
            </dl>
          </div>
        </article>

        <section className="nested-list">
          <h3>Посты пользователя</h3>
          {state.posts.length ? (
            state.posts.map((post) => (
              <button
                className="nested-item"
                type="button"
                key={post.id}
                onClick={() => navigateToPost(post.id)}
              >
                <span>#{post.id}</span>
                <strong>{post.title}</strong>
                <small>{post.body}</small>
              </button>
            ))
          ) : (
            <p className="muted">У пользователя пока нет постов.</p>
          )}
        </section>
      </section>
    );
  }

  if (state.status !== 'post') {
    return null;
  }

  const { comments, post } = state;
  const isFavorite = favoritePosts.includes(post.id);

  return (
    <section className="detail-panel">
      <div className="detail-head">
        <Button label="Вернуться к списку" view="secondary" size="m" onClick={navigateHome} />
        <button
          className={`favorite-pill ${isFavorite ? 'favorite-pill--active' : ''}`}
          type="button"
          onClick={() => onFavoritePost(post.id)}
        >
          ★ {isFavorite ? 'В избранном' : 'В избранное'}
        </button>
      </div>

      <article className="post-card">
        <p className="eyebrow">Пост #{post.id} · user #{post.user_id}</p>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </article>

      <section className="nested-list">
        <h3>Комментарии</h3>
        {comments.length ? (
          comments.map((comment) => (
            <article className="comment-item" key={comment.id}>
              <div>
                <strong>{comment.name}</strong>
                <span>{comment.email}</span>
              </div>
              <p>{comment.body}</p>
            </article>
          ))
        ) : (
          <p className="muted">У поста пока нет комментариев.</p>
        )}
      </section>
    </section>
  );
};
