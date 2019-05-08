import React from 'react';
import { Query } from 'react-apollo';

import Grid from 'components/Grid';
import { ButtonisedNavLink } from 'components/Buttons';
import { WorkItemCard } from 'components/ItemCard';

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
        <ButtonisedNavLink to={projectListUrl}>To Projects</ButtonisedNavLink>
      </div>
      <div className="dashboard__content">
        <Query query={Fetch.getDashboard}>
          {({ loading, error, data = {} }) => {
            const { dashboardCurrentWork = [] } = data.dashboard || {};
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

            return widgets.map((obj) => (
              <section
                key={obj.title}
                className="dashboard__section dashboard-widget"
              >
                <header>
                  <h2 className="dashboard-widget__title">
                    {separateAndCapitaliseAll(obj.title)}
                  </h2>
                </header>
                <div className="dashboard-widget__content">
                  <Grid className="dashboard-grid" items={obj.items}>
                    {(item) => (
                      <WorkItemCard
                        key={item.id}
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
            ));
          }}
        </Query>
      </div>
    </div>
  );
}

export default Dashboard;
