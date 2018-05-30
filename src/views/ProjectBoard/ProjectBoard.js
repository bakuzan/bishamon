import React from 'react';
import { Query } from 'react-apollo';

import { Button, ButtonisedNavLink } from 'components/Buttons';
import Board from 'components/Board/Board';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import ProjectBoardCreate from './ProjectBoardCreate';
import Fetch from 'queries/fetch';
import Fragment from 'queries/fragment';
import Mutate from 'queries/mutate';
import Routes, { PROJECT_LIST_URL } from 'constants/routes';
import { dataIdForObject } from 'utils/common';

class ProjectBoard extends React.Component {
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
    console.log(workItemUpdate);
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
    const workItemDetailUrl = `${match.url}${Routes.workItemDetail}`;
    const mutationProps = {
      mutation: Mutate.workItemStatusUpdate,
      update: this.handleCacheUpdate
    };
    console.log(this.state);
    return (
      <Query query={Fetch.projectInformation} variables={{ id: projectId }}>
        {({ loading, error, data = {} }) => {
          return (
            <ProjectInformation
              data={data.project}
              headerContent={
                <div className="button-group right-aligned">
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
                <ProjectBoardCreate
                  projectId={projectId}
                  onCancel={this.handleResolvingAddWork}
                  onCompleted={this.handleResolvingAddWork}
                />
              )}
              {!isAddingWork && (
                <Query query={Fetch.projectWorkItems} variables={{ projectId }}>
                  {({ loading, error, data = {} }) => {
                    console.log(data, data.workItems);
                    return (
                      <Board
                        data={data.workItems}
                        swimlaneCardLinkPath={workItemDetailUrl}
                        mutationProps={mutationProps}
                      />
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

export default ProjectBoard;
