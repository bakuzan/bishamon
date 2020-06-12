import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet-async';

import Tabs from 'meiko/Tabs';
import LoadableContent from 'meiko/LoadableContent';
import Board from 'components/Board';
import Grid from 'components/Grid';
import { TaskCard } from 'components/ItemCard';

import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import { RouteContext } from 'context';
import * as Routes from 'constants/routes';
import { Common, Mappers, Filters } from 'utils';

class TaskBoard extends React.Component {
  constructor(props) {
    super(props);

    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleCacheUpdate(
    cache,
    {
      data: { taskUpdate }
    }
  ) {
    const { status, __typename } = taskUpdate;
    cache.writeFragment({
      id: Common.dataIdForObject(taskUpdate),
      fragment: Fragment.taskStatus,
      data: { status, __typename }
    });
  }

  render() {
    const { match, projectData } = this.props;
    const projectId = Number(match.params.projectId);
    const workItemId = Number(match.params.workItemId);

    const cardUrls = {
      key: 'taskId',
      drilldown: '#',
      edit: Routes.buildUrlWithIds(Routes.taskEditUrl, {
        projectId,
        workItemId
      })
    };

    const mutationProps = {
      mutation: Mutate.taskStatusUpdate,
      update: this.handleCacheUpdate,
      refetchQueries: () => [
        {
          query: Fetch.workItemRefreshOnTaskMutation,
          variables: { id: workItemId }
        }
      ],
      buildOptimisticResponse: Mappers.mapTaskViewToOptimisticResponse
    };

    return (
      <React.Fragment>
        <Helmet>
          {projectData && (
            <title>
              {`${projectData.name} /
                    ${projectData.workItem.name} / Tasks`}
            </title>
          )}
        </Helmet>

        <Query query={Fetch.workItemTasks} variables={{ workItemId }}>
          {({ loading, data = {} }) => {
            const { tasksHistoricCount = 0, tasksOnHoldCount = 0 } = data;
            const boardItems = Filters.filterListForBoardItems(data.tasks);

            return (
              <LoadableContent isFetching={loading}>
                <Tabs.Container>
                  <Tabs.View
                    name="BOARD"
                    displayName={`Board (${boardItems.length})`}
                    className="board-tab"
                  >
                    <RouteContext.Provider value={cardUrls}>
                      <Board data={boardItems} mutationProps={mutationProps} />
                    </RouteContext.Provider>
                  </Tabs.View>
                  <Tabs.View
                    name="ON_HOLD"
                    displayName={`On Hold (${tasksOnHoldCount})`}
                  >
                    {(onHoldActive) =>
                      onHoldActive && (
                        <Query
                          query={Fetch.workItemTasksOnHold}
                          variables={{ workItemId }}
                        >
                          {({ loading: loadingOnHold, data = {} }) => (
                            <LoadableContent isFetching={loadingOnHold}>
                              <Grid
                                className="bishamon-item-grid"
                                items={data.tasksOnHold}
                              >
                                {(item) => (
                                  <TaskCard key={item.id} data={item} />
                                )}
                              </Grid>
                            </LoadableContent>
                          )}
                        </Query>
                      )
                    }
                  </Tabs.View>
                  <Tabs.View
                    name="HISTORIC"
                    displayName={`Historic (${tasksHistoricCount})`}
                  >
                    {(historicActive) =>
                      historicActive && (
                        <Query
                          query={Fetch.workItemTasksHistoric}
                          variables={{ workItemId }}
                        >
                          {({ loading: loadingHistoric, data = {} }) => (
                            <LoadableContent isFetching={loadingHistoric}>
                              <Grid
                                className="bishamon-item-grid"
                                items={data.tasksHistoric}
                              >
                                {(item) => (
                                  <TaskCard
                                    key={item.id}
                                    data={item}
                                    readOnly
                                  />
                                )}
                              </Grid>
                            </LoadableContent>
                          )}
                        </Query>
                      )
                    }
                  </Tabs.View>
                </Tabs.Container>
              </LoadableContent>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default TaskBoard;
