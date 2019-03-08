import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import Tabs from 'components/Tabs';
import Board from 'components/Board';
import Grid from 'components/Grid';

import { WorkItemCard } from 'components/ItemCard';

import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import * as Routes from 'constants/routes';
import { RouteContext } from 'context';
import { dataIdForObject } from 'utils/common';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';
import { filterListForBoardItems } from 'utils/filters';

class WorkItemBoard extends React.Component {
  constructor(props) {
    super(props);

    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleCacheUpdate(
    cache,
    {
      data: { workItemUpdate }
    }
  ) {
    const { status, __typename } = workItemUpdate;
    cache.writeFragment({
      id: dataIdForObject(workItemUpdate),
      fragment: Fragment.workItemStatus,
      data: { status, __typename }
    });
  }

  render() {
    const { match, projectData } = this.props;
    const projectId = Number(match.params.projectId);

    const cardUrls = {
      key: 'workItemId',
      drilldown: Routes.buildUrlWithIds(Routes.taskBoardUrl, { projectId }),
      edit: Routes.buildUrlWithIds(Routes.workItemEditUrl, { projectId })
    };

    const mutationProps = {
      mutation: Mutate.workItemStatusUpdate,
      update: this.handleCacheUpdate,
      refetchQueries: () => [
        {
          query: Fetch.projectRefreshOnWorkItemMutation,
          variables: { id: projectId }
        }
      ],
      buildOptimisticResponse: mapWorkItemViewToOptimisticResponse
    };

    return (
      <React.Fragment>
        <Helmet>
          {projectData && <title>{`${projectData.name} / Work Items`}</title>}
        </Helmet>

        <Query query={Fetch.projectWorkItems} variables={{ projectId }}>
          {({ loading, error, data = {} }) => {
            const {
              workItemsHistoricCount = 0,
              workItemsOnHoldCount = 0
            } = data;
            const boardItems = filterListForBoardItems(data.workItems);

            return (
              <Tabs.TabContainer>
                <Tabs.TabView
                  name="BOARD"
                  displayName={`Board (${boardItems.length})`}
                >
                  <RouteContext.Provider value={cardUrls}>
                    <Board data={boardItems} mutationProps={mutationProps} />
                  </RouteContext.Provider>
                </Tabs.TabView>
                <Tabs.TabView
                  name="OH_HOLD"
                  displayName={`On Hold (${workItemsOnHoldCount})`}
                >
                  {(onHoldActive) =>
                    onHoldActive && (
                      <Query
                        query={Fetch.projectWorkItemsOnHold}
                        variables={{ projectId }}
                      >
                        {({ loading, error, data = {} }) => (
                          <Grid
                            className="bishamon-item-grid"
                            items={data.workItemsOnHold}
                          >
                            {(item) => (
                              <WorkItemCard key={item.id} data={item} />
                            )}
                          </Grid>
                        )}
                      </Query>
                    )
                  }
                </Tabs.TabView>
                <Tabs.TabView
                  name="HISTORIC"
                  displayName={`Historic (${workItemsHistoricCount})`}
                >
                  {(historicActive) =>
                    historicActive && (
                      <Query
                        query={Fetch.projectWorkItemsHistoric}
                        variables={{ projectId }}
                      >
                        {({ loading, error, data = {} }) => (
                          <Grid
                            className="bishamon-item-grid"
                            items={data.workItemsHistoric}
                          >
                            {(item) => (
                              <WorkItemCard
                                key={item.id}
                                data={item}
                                readOnly
                              />
                            )}
                          </Grid>
                        )}
                      </Query>
                    )
                  }
                </Tabs.TabView>
              </Tabs.TabContainer>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default WorkItemBoard;
