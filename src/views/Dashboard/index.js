import React from 'react';
import { Query } from 'react-apollo';

import { Tabs } from 'mko';
import Grid from 'components/Grid';
import { ButtonisedNavLink } from 'components/Buttons';
import { WorkItemCard } from 'components/ItemCard';
import NoteWidget from 'components/NoteWidget';
import { dashboardWorkItemUpdater } from 'components/ItemCard/ItemCardUpdaters';

import Fetch from 'queries/fetch';
import { ItemStatus } from 'constants/status';
import { projectListUrl } from 'constants/routes';
import { separateAndCapitaliseAll } from 'utils/common';

import './Dashboard.scss';

const STATUSES = [ItemStatus.InProgress, ItemStatus.Todo];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__actions">
        <div id="notes-toggle"></div>
        <ButtonisedNavLink to={projectListUrl}>To Projects</ButtonisedNavLink>
      </div>
      <div className="dashboard__content">
        <NoteWidget />

        <Query query={Fetch.getDashboard}>
          {({ data = {} }) => {
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
              <Tabs.Container>
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
                    <Grid className="dashboard-grid" items={onholdItems}>
                      {(item) => (
                        <WorkItemCard
                          key={item.id}
                          className="dashboard__item"
                          data={item}
                          updater={dashboardWorkItemUpdater}
                        />
                      )}
                    </Grid>
                  </div>
                </Tabs.View>
              </Tabs.Container>
            );
          }}
        </Query>
      </div>
    </div>
  );
}

export default Dashboard;
