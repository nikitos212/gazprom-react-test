import { splitFullName } from '../../lib/dashboardUtils';
import type { User } from '../../types';
import { EmptyRows, SkeletonRows } from './TableStates';

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  favoriteUsers: number[];
  onFavorite: (id: number) => void;
  onOpen: (user: User) => void;
};

export const UsersTable = ({
  users,
  isLoading,
  favoriteUsers,
  onFavorite,
  onOpen,
}: UsersTableProps) => (
  <div className="table-wrap">
    <table className="data-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
          <th>Статус</th>
          <th aria-label="Избранное" />
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <SkeletonRows columns={5} />
        ) : users.length ? (
          users.map((user) => {
            const { name, surname } = splitFullName(user.name);
            const isFavorite = favoriteUsers.includes(user.id);

            return (
              <tr
                key={user.id}
                tabIndex={0}
                onClick={() => onOpen(user)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onOpen(user);
                  }
                }}
              >
                <td>
                  <strong>{name}</strong>
                  <span>#{user.id}</span>
                </td>
                <td>{surname}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status status--${user.status}`}>
                    {user.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </td>
                <td>
                  <button
                    className={`icon-action ${isFavorite ? 'icon-action--active' : ''}`}
                    type="button"
                    title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                    onClick={(event) => {
                      event.stopPropagation();
                      onFavorite(user.id);
                    }}
                  >
                    ★
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <EmptyRows columns={5} text="На этой странице нет совпадений с фильтром." />
        )}
      </tbody>
    </table>
  </div>
);
