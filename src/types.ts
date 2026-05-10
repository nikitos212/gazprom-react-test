export type ViewMode = 'users' | 'posts';

export type PageSize = 10 | 25 | 50;

export type User = {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
};

export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type PaginationMeta = {
  total: number;
  pages: number;
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type AppRoute =
  | { kind: 'home' }
  | { kind: 'user'; id: number }
  | { kind: 'post'; id: number };

export type RecentItem = {
  id: number;
  kind: ViewMode;
  title: string;
  visitedAt: string;
};

export type DetailState =
  | { status: 'idle' | 'loading'; user?: never; post?: never; comments?: never; posts?: never; error?: never }
  | { status: 'user'; user: User; posts: Post[]; post?: never; comments?: never; error?: never }
  | { status: 'post'; post: Post; comments: Comment[]; user?: never; posts?: never; error?: never }
  | { status: 'error'; error: string; user?: never; post?: never; comments?: never; posts?: never };
