import React from 'react';
import { Query } from 'react-apollo';

import Tabs from 'components/Tabs';
import { Button, ButtonisedNavLink } from 'components/Buttons';
import Board from 'components/Board/Board';
import List from 'components/List/List';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import { TaskCard } from 'components/ItemCard';
import WorkItemDetailCreate from './WorkItemDetailCreate';
import TaskView from './TaskView';
import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import Routes from 'constants/routes';
import { dataIdForObject } from 'utils/common';
import { mapTaskViewToOptimisticResponse } from 'utils/mappers';
import { filterListForOnHoldItems } from 'utils/filters';

const RE = `\\${Routes.workItemDetail}.*$`;
const EXTRACT_BACK_URL = new RegExp(RE, 'g');

class WorkItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleResolvingAdd = this.handleResolvingAdd.bind(this);
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
      id: dataIdForObject(taskUpdate),
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
      buildOptimisticResponse: mapTaskViewToOptimisticResponse
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
                <div className="button-group right-aligned">
                  <Button btnStyle="primary" onClick={this.handleAdd}>
                    Add Task
                  </Button>
                  <ButtonisedNavLink to={backUrl}>Back</ButtonisedNavLink>
                </div>
              }
            >
              {isAdding && (
                <WorkItemDetailCreate
                  workItemId={workItemId}
                  onCancel={this.handleResolvingAdd}
                  onCompleted={this.handleResolvingAdd}
                />
              )}
              {!isAdding && (
                <Query query={Fetch.workItemTasks} variables={{ workItemId }}>
                  {({ loading, error, data = {} }) => {
                    return (
                      <Tabs.TabContainer>
                        <Tabs.TabView name="Board">
                          <Board
                            data={data.tasks}
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
                        <Tabs.TabView name="On Hold">
                          <List
                            items={filterListForOnHoldItems(data.tasks)}
                            itemTemplate={item => (
                              <TaskCard key={item.id} data={item} />
                            )}
                          />
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

export default WorkItemDetail;
