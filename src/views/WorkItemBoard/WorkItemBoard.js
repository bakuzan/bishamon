import React from 'react';
import { Query } from 'react-apollo';

import Tabs from 'components/Tabs';
import { Button, ButtonisedNavLink } from 'components/Buttons';
import Board from 'components/Board/Board';
import Grid from 'components/Grid';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import { WorkItemCard } from 'components/ItemCard';
import WorkItemBoardCreate from './WorkItemBoardCreate';
import WorkItemView from './WorkItemView';
import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import Routes, { PROJECT_LIST_URL } from 'constants/routes';
import { dataIdForObject } from 'utils/common';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';
import {
  filterListForOnHoldItems,
  filterListForBoardItems
} from 'utils/filters';

class WorkItemBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingWork: false
    };

    this.handleAddWork = this.handleAddWork.bind(this);
    this.handleResolvingAddWork = this.handleResolvingAddWork.bind(this);
    this.handleCacheUpdate = this.handleCacheUpdate.bind(this);
  }

  handleAddWork() {
    this.setState({ isAddingWork: true });
  }

  handleResolvingAddWork() {
    this.setState({ isAddingWork: false });
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
    const { isAddingWork } = this.state;
    const { match } = this.props;
    const projectId = Number(match.params.projectId);
    const taskBoardUrl = `${match.url}${Routes.taskBoard}`;
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
      <Query query={Fetch.projectInformation} variables={{ id: projectId }}>
        {({ loading, error, data = {} }) => {
          return (
            <ProjectInformation
              data={data.project}
              headerContent={
                <div className="page-actions button-group right-aligned">
                  <Button btnStyle="primary" onClick={this.handleAddWork}>
                    Add Work
                  </Button>
                  <ButtonisedNavLink to={PROJECT_LIST_URL}>
                    Back
                  </ButtonisedNavLink>
                </div>
              }
            >
              {isAddingWork && (
                <WorkItemBoardCreate
                  projectId={projectId}
                  onCancel={this.handleResolvingAddWork}
                  onCompleted={this.handleResolvingAddWork}
                />
              )}
              {!isAddingWork && (
                <Query query={Fetch.projectWorkItems} variables={{ projectId }}>
                  {({ loading, error, data = {} }) => {
                    const boardItems = filterListForBoardItems(data.workItems);
                    const onHoldWorkItems = filterListForOnHoldItems(
                      data.workItems
                    );
                    const historicItems = data.workItemsHistoric || [];

                    return (
                      <Tabs.TabContainer>
                        <Tabs.TabView
                          name="BOARD"
                          displayName={`Board (${boardItems.length})`}
                        >
                          <Board
                            data={boardItems}
                            swimlaneCardLinkPath={taskBoardUrl}
                            mutationProps={mutationProps}
                            renderSelectedCardView={({
                              selectedId,
                              closeView
                            }) => (
                              <WorkItemView
                                projectId={projectId}
                                id={selectedId}
                                closeView={closeView}
                              />
                            )}
                          />
                        </Tabs.TabView>
                        <Tabs.TabView
                          name="OH_HOLD"
                          displayName={`On Hold (${onHoldWorkItems.length})`}
                        >
                          <Grid
                            className="bishamon-board-grid"
                            items={onHoldWorkItems}
                          >
                            {(item) => (
                              <WorkItemCard key={item.id} data={item} />
                            )}
                          </Grid>
                        </Tabs.TabView>
                        <Tabs.TabView
                          name="HISTORIC"
                          displayName={`Historic (${historicItems.length})`}
                        >
                          <Grid
                            className="bishamon-board-grid"
                            items={historicItems}
                          >
                            {(item) => (
                              <WorkItemCard
                                key={item.id}
                                data={item}
                                readOnly
                              />
                            )}
                          </Grid>
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

export default WorkItemBoard;
