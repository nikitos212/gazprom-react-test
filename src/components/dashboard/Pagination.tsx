import { Button } from '@consta/uikit/Button';
import { pageSizeOptions } from '../../constants/dashboard';
import { getPageWindow } from '../../lib/dashboardUtils';
import type { PageSize, PaginationMeta } from '../../types';

type PaginationProps = {
  page: number;
  pageSize: PageSize;
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSize) => void;
};

export const Pagination = ({
  page,
  pageSize,
  meta,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.max(meta.pages, 1);
  const pages = getPageWindow(page, totalPages);

  return (
    <div className="pagination" aria-label="Пагинация">
      <div className="pagination__controls">
        <Button
          label="Предыдущая"
          view="secondary"
          size="s"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        <div className="page-numbers">
          {pages.map((pageNumber) => (
            <button
              className={pageNumber === page ? 'page-number page-number--active' : 'page-number'}
              type="button"
              key={pageNumber}
              aria-current={pageNumber === page ? 'page' : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <Button
          label="Следующая"
          view="secondary"
          size="s"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </div>

      <label className="page-size">
        <span>Элементов</span>
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value) as PageSize)}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
