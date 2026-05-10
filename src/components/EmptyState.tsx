type EmptyStateProps = {
  title: string;
  text: string;
};

export const EmptyState = ({ title, text }: EmptyStateProps) => (
  <div className="empty-state">
    <span className="empty-state__icon" aria-hidden="true" />
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);
