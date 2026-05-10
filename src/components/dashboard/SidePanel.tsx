import { navigateToPost, navigateToUser } from '../../hooks/useHashRoute';
import { formatDateTime } from '../../lib/dashboardUtils';
import type { PageSize, RecentItem, ViewMode } from '../../types';

type SidePanelProps = {
  mode: ViewMode;
  activePageSize: PageSize;
  favoriteCount: number;
  query: string;
  recentItems: RecentItem[];
};

export const SidePanel = ({
  mode,
  activePageSize,
  favoriteCount,
  query,
  recentItems,
}: SidePanelProps) => (
  <aside className="side-panel" aria-label="Состояние сессии">
    <section className="side-section">
      <h2>Сессия</h2>
      <div className="storage-grid">
        <div>
          <span>Режим</span>
          <strong>{mode === 'users' ? 'Пользователи' : 'Посты'}</strong>
        </div>
        <div>
          <span>Размер</span>
          <strong>{activePageSize}</strong>
        </div>
        <div>
          <span>Избранное</span>
          <strong>{favoriteCount}</strong>
        </div>
        <div>
          <span>Фильтр</span>
          <strong>{query ? 'есть' : 'нет'}</strong>
        </div>
      </div>
    </section>

    <section className="side-section">
      <h2>История карточек</h2>
      {recentItems.length ? (
        <div className="recent-list">
          {recentItems.map((item) => (
            <button
              className="recent-item"
              type="button"
              key={`${item.kind}-${item.id}`}
              onClick={() =>
                item.kind === 'users' ? navigateToUser(item.id) : navigateToPost(item.id)
              }
            >
              <span>{item.kind === 'users' ? 'USER' : 'POST'} · #{item.id}</span>
              <strong>{item.title}</strong>
              <small>{formatDateTime(item.visitedAt)}</small>
            </button>
          ))}
        </div>
      ) : (
        <p className="muted">Откройте строку таблицы, и она появится здесь.</p>
      )}
    </section>
  </aside>
);
