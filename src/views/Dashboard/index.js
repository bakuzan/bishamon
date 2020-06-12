import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet-async';

import { separateAndCapitaliseAll } from 'ayaka/capitalise';
import Tabs from 'meiko/Tabs';
import LoadableContent from 'meiko/LoadableContent';

import Grid from 'components/Grid';
import { ButtonisedNavLink } from 'components/Buttons';
import { WorkItemCard } from 'components/ItemCard';
import NoteWidget from 'components/NoteWidget';
import { dashboardWorkItemUpdater } from 'components/ItemCard/ItemCardUpdaters';

import Fetch from 'queries/fetch';
import { ItemStatus } from 'constants/status';
import { projectListUrl } from 'constants/routes';

import './Dashboard.scss';

const STATUSES = [ItemStatus.InProgress, ItemStatus.Todo];

function Dashboard() {
  return (
    <section className="dashboard">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <header className="dashboard__header">
        <h2 className="dashboard__title">Dashboard</h2>
        <div id="notes-toggle" className="dashboard__notes"></div>
        <div className="flex-spacer"></div>
        <ButtonisedNavLink to={projectListUrl}>To Projects</ButtonisedNavLink>
      </header>
      <div className="dashboard__content">
        <NoteWidget />

        <Query query={Fetch.getDashboard}>
          {({ loading, data = {} }) => {
            const { dashboardCurrentWork = [] } = data.dashboard || {};
            const onholdItems = dashboardCurrentWork.filter(
              (x) => x.status === ItemStatus.OnHold
            );

            const widgets = STATUSES.reduce(
              (p, title) => [
                ...p,
                {
                  title,
                  items: dashboardCurrentWork.filter((x) => x.status === title)
                }
              ],
              []
            );

            const [ongoingCount, todoCount] = widgets.map(
              (x) => x.items.length
            );

            return (
              <LoadableContent isFetching={loading}>
                <Tabs.Container className="dashboard-tabs">
                  <Tabs.View
                    name="OVERVIEW"
                    displayName={`Overview (${ongoingCount} - ${todoCount})`}
                  >
                    <div className="dashboard__widgets">
                      {widgets.map((obj) => (
                        <section
                          key={obj.title}
                          className="dashboard__section dashboard-widget"
                        >
                          <header className="dashboard-widget__header">
                            <h2 className="dashboard-widget__title">
                              {separateAndCapitaliseAll(obj.title)} (
                              {obj.items.length})
                            </h2>
                          </header>
                          <div className="dashboard-widget__content">
                            <Grid className="dashboard-grid" items={obj.items}>
                              {(item) => (
                                <WorkItemCard
                                  key={item.id}
                                  className="dashboard__item"
                                  data={item}
                                  readOnly
                                  includeLinks
                                  customDescription={(data) => (
                                    <React.Fragment>
                                      <div className="dashboard-grid__item-type">
                                        {data.type}
                                      </div>
                                      <div className="dashboard-grid__item-ratio">
                                        {data.taskRatio}
                                      </div>
                                    </React.Fragment>
                                  )}
                                />
                              )}
                            </Grid>
                          </div>
                        </section>
                      ))}
                    </div>
                  </Tabs.View>
                  <Tabs.View
                    name="ONHOLD"
                    displayName={`On Hold (${onholdItems.length})`}
                  >
                    <div className="dashboard__widgets">
                      <Grid
                        className="dashboard-grid-onhold"
                        items={onholdItems}
                      >
                        {(item) => (
                          <WorkItemCard
                            key={item.id}
                            className="dashboard__item"
                            data={item}
                            updater={dashboardWorkItemUpdater}
                            includeProjectName
                          />
                        )}
                      </Grid>
                    </div>
                  </Tabs.View>
                </Tabs.Container>
              </LoadableContent>
            );
          }}
        </Query>
      </div>
    </section>
  );
}

export default Dashboard;
