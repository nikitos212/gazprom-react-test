type IntroPanelProps = {
  favoriteCount: number;
  recentCount: number;
};

export const IntroPanel = ({ favoriteCount, recentCount }: IntroPanelProps) => (
  <div className="intro-panel">
    <div>
      <p className="eyebrow">Единый контур данных</p>
      <h1>GoRest Control Center</h1>
      <p className="intro-panel__text">
        Оперативный доступ к пользователям, постам, комментариям и ключевым записям.
      </p>
    </div>

    <div className="hero-meter" aria-label="Локальные показатели">
      <div>
        <span>{favoriteCount}</span>
        <small>избранное</small>
      </div>
      <div>
        <span>{recentCount}</span>
        <small>история</small>
      </div>
    </div>
  </div>
);
