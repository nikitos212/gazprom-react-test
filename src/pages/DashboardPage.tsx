import { ControlPanel } from '../components/dashboard/ControlPanel';
import { DetailPanel } from '../components/dashboard/DetailPanel';
import { IntroPanel } from '../components/dashboard/IntroPanel';
import { ListPanel } from '../components/dashboard/ListPanel';
import { SidePanel } from '../components/dashboard/SidePanel';
import { Topbar } from '../components/dashboard/Topbar';
import { navigateToPost, navigateToUser, useHashRoute } from '../hooks/useHashRoute';
import { useDetailData } from '../hooks/useDetailData';
import { useListData } from '../hooks/useListData';
import { usePersistedWorkspace } from '../hooks/usePersistedWorkspace';
import type { Post, User } from '../types';

export const DashboardPage = () => {
  const route = useHashRoute();
  const workspace = usePersistedWorkspace();
  const listData = useListData({
    routeKind: route.kind,
    hasToken: workspace.hasToken,
    token: workspace.trimmedToken,
    mode: workspace.mode,
    activePage: workspace.activePage,
    activePageSize: workspace.activePageSize,
    query: workspace.query,
  });
  const detailState = useDetailData({
    route,
    hasToken: workspace.hasToken,
    token: workspace.trimmedToken,
    rememberRecent: workspace.rememberRecent,
  });

  const openUser = (user: User) => {
    workspace.rememberRecent({ id: user.id, kind: 'users', title: user.name });
    navigateToUser(user.id);
  };

  const openPost = (post: Post) => {
    workspace.rememberRecent({ id: post.id, kind: 'posts', title: post.title });
    navigateToPost(post.id);
  };

  return (
    <div className="app-shell">
      <Topbar hasToken={workspace.hasToken} />

      <main className="layout">
        <section className="workspace">
          <IntroPanel
            favoriteCount={workspace.favoriteCount}
            recentCount={workspace.recentItems.length}
          />

          <ControlPanel
            token={workspace.token}
            query={workspace.query}
            hasToken={workspace.hasToken}
            onTokenChange={workspace.setToken}
            onQueryChange={workspace.setQuery}
            onReset={workspace.resetWorkspace}
          />

          {route.kind === 'home' ? (
            <ListPanel
              mode={workspace.mode}
              meta={listData.meta}
              hasToken={workspace.hasToken}
              listError={listData.error}
              isLoading={listData.isLoading}
              activePage={workspace.activePage}
              activePageSize={workspace.activePageSize}
              users={listData.users}
              posts={listData.posts}
              favoriteUsers={workspace.favoriteUsers}
              favoritePosts={workspace.favoritePosts}
              onModeChange={workspace.setMode}
              onPageChange={(page) => workspace.setActivePage(page, listData.meta.pages)}
              onPageSizeChange={workspace.setActivePageSize}
              onFavoriteUser={workspace.toggleFavoriteUser}
              onFavoritePost={workspace.toggleFavoritePost}
              onOpenUser={openUser}
              onOpenPost={openPost}
            />
          ) : (
            <DetailPanel
              state={detailState}
              favoriteUsers={workspace.favoriteUsers}
              favoritePosts={workspace.favoritePosts}
              onFavoriteUser={workspace.toggleFavoriteUser}
              onFavoritePost={workspace.toggleFavoritePost}
            />
          )}
        </section>

        <SidePanel
          mode={workspace.mode}
          activePageSize={workspace.activePageSize}
          favoriteCount={workspace.favoriteCount}
          query={workspace.query}
          recentItems={workspace.recentItems}
        />
      </main>
    </div>
  );
};
