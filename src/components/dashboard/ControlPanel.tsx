import { Button } from '@consta/uikit/Button';

type ControlPanelProps = {
  token: string;
  query: string;
  hasToken: boolean;
  onTokenChange: (token: string) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
};

export const ControlPanel = ({
  token,
  query,
  hasToken,
  onTokenChange,
  onQueryChange,
  onReset,
}: ControlPanelProps) => (
  <section className="control-panel" aria-label="Настройки API">
    <div className="field field--token">
      <label htmlFor="token">Access token</label>
      <input
        id="token"
        className={`input ${!hasToken ? 'input--invalid' : ''}`}
        type="password"
        value={token}
        placeholder="Вставьте токен GoRest"
        onChange={(event) => onTokenChange(event.target.value)}
      />
      <span className="field__hint">
        {hasToken ? 'Готов к запросам GoRest.' : 'Обязательное поле для запросов.'}
      </span>
    </div>

    <div className="field">
      <label htmlFor="quick-search">Фильтр текущей страницы</label>
      <input
        id="quick-search"
        className="input"
        type="search"
        value={query}
        placeholder="Имя, email, ID или заголовок"
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>

    <Button label="Сбросить сессию" view="ghost" size="m" onClick={onReset} />
  </section>
);
