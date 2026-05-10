export const SkeletonRows = ({ columns }: { columns: number }) => (
  <>
    {Array.from({ length: 6 }, (_, index) => (
      <tr className="skeleton-row" key={index}>
        {Array.from({ length: columns }, (_, columnIndex) => (
          <td key={columnIndex}>
            <span />
          </td>
        ))}
      </tr>
    ))}
  </>
);

export const EmptyRows = ({ columns, text }: { columns: number; text: string }) => (
  <tr className="empty-row">
    <td colSpan={columns}>{text}</td>
  </tr>
);
