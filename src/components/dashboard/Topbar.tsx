import { Button } from '@consta/uikit/Button';
import { navigateHome } from '../../hooks/useHashRoute';

type TopbarProps = {
  hasToken: boolean;
};

export const Topbar = ({ hasToken }: TopbarProps) => (
  <header className="topbar" aria-label="Верхняя панель">
    <button className="brand" type="button" onClick={navigateHome}>
      <span>
        <span className="brand__title">ДИП : КОД</span>
        <span className="brand__subtitle">GoRest Control</span>
      </span>
    </button>

    <div className="topbar__actions">
      <span className={`token-state ${hasToken ? 'token-state--ready' : ''}`}>
        {hasToken ? 'Токен активен' : 'Токен не задан'}
      </span>
      <Button label="На главную" view="secondary" size="s" onClick={navigateHome} />
    </div>
  </header>
);
