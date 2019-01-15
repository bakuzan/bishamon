import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';

import Tabs from 'components/Tabs';
import { Button, ButtonisedNavLink } from 'components/Buttons';
import Board from 'components/Board/Board';
import Grid from 'components/Grid';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import { TaskCard } from 'components/ItemCard';
import TaskBoardCreate from './TaskBoardCreate';
import TaskView from './TaskView';
import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import Routes from 'constants/routes';
import { Common, Mappers, Filters } from 'utils';

const RE = `\\${Routes.taskBoard}.*$`;
const EXTRACT_BACK_URL = new RegExp(RE, 'g');

class TaskBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleResolvingAdd = this.handleResolvingAdd.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleAdd() {
    this.setState({ isAdding: true });
  }

  handleResolvingAdd() {
    this.setState({ isAdding: false });
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
    const { isAdding } = this.state;
    const { match } = this.props;
    const backUrl = match.url.replace(EXTRACT_BACK_URL, '');
    const projectId = Number(match.params.projectId);
    const workItemId = Number(match.params.workItemId);
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
      <Query
        query={Fetch.projectWorkItemInformation}
        variables={{ projectId, workItemId }}
      >
        {({ loading, error, data = {} }) => {
          return (
            <ProjectInformation
              data={data.project}
              headerContent={
                <div className="page-actions button-group right-aligned">
                  <Button btnStyle="primary" onClick={this.handleAdd}>
                    Add Task
                  </Button>
                  <ButtonisedNavLink to={backUrl}>Back</ButtonisedNavLink>
                </div>
              }
            >
              <Helmet>
                {data.project && (
                  <title>
                    {`${data.project.name} /
                    ${data.project.workItem.name} / Tasks`}
                  </title>
                )}
              </Helmet>
              {isAdding && (
                <TaskBoardCreate
                  projectData={data.project}
                  workItemId={workItemId}
                  onCancel={this.handleResolvingAdd}
                  onCompleted={this.handleResolvingAdd}
                />
              )}
              {!isAdding && (
                <Query query={Fetch.workItemTasks} variables={{ workItemId }}>
                  {({ loading, error, data = {} }) => {
                    const {
                      tasksHistoricCount = 0,
                      tasksOnHoldCount = 0
                    } = data;
                    const boardItems = Filters.filterListForBoardItems(
                      data.tasks
                    );

                    return (
                      <Tabs.TabContainer>
                        <Tabs.TabView
                          name="BOARD"
                          displayName={`Board (${boardItems.length})`}
                        >
                          <Board
                            data={boardItems}
                            mutationProps={mutationProps}
                            renderSelectedCardView={({
                              selectedId,
                              closeView
                            }) => (
                              <TaskView
                                workItemId={workItemId}
                                id={selectedId}
                                closeView={closeView}
                              />
                            )}
                          />
                        </Tabs.TabView>
                        <Tabs.TabView
                          name="ON_HOLD"
                          displayName={`On Hold (${tasksOnHoldCount})`}
                        >
                          {(onHoldActive) =>
                            onHoldActive && (
                              <Query
                                query={Fetch.workItemTasksOnHold}
                                variables={{ workItemId }}
                              >
                                {({ loading, error, data = {} }) => (
                                  <Grid
                                    className="bishamon-board-grid"
                                    items={data.tasksOnHold}
                                  >
                                    {(item) => (
                                      <TaskCard key={item.id} data={item} />
                                    )}
                                  </Grid>
                                )}
                              </Query>
                            )
                          }
                        </Tabs.TabView>
                        <Tabs.TabView
                          name="HISTORIC"
                          displayName={`Historic (${tasksHistoricCount})`}
                        >
                          {(historicActive) =>
                            historicActive && (
                              <Query
                                query={Fetch.workItemTasksHistoric}
                                variables={{ workItemId }}
                              >
                                {({ loading, error, data = {} }) => (
                                  <Grid
                                    className="bishamon-board-grid"
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
                                )}
                              </Query>
                            )
                          }
                        </Tabs.TabView>
                      </Tabs.TabContainer>
                    );
                  }}
                </Query>
              )}
            </ProjectInformation>
          );
        }}
      </Query>
    );
  }
}

export default TaskBoard;
