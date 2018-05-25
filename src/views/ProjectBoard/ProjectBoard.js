import React from 'react';
import { Query } from 'react-apollo';

import { Button } from 'components/Buttons';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import ProjectBoardCreate from './ProjectBoardCreate';
import Fetch from 'queries/fetch';

class ProjectBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingWork: false
    };

    this.handleAddWork = this.handleAddWork.bind(this);
    this.handleResolvingAddWork = this.handleResolvingAddWork.bind(this);
  }

  handleAddWork() {
    this.setState({ isAddingWork: true });
  }

  handleResolvingAddWork() {
    this.setState({ isAddingWork: false });
  }

  render() {
    const { isAddingWork } = this.state;
    const { match } = this.props;
    const projectId = match.params.projectId;

    return (
      <Query query={Fetch.projectInformation} variables={{ id: projectId }}>
        {({ loading, error, data }) => {
          return (
            <ProjectInformation
              data={data.project}
              headerContent={
                <div className="button-group right-aligned">
                  <Button btnStyle="primary" onClick={this.handleAddWork}>
                    Add Work
                  </Button>
                </div>
              }
            >
              {isAddingWork && (
                <ProjectBoardCreate
                  onCancel={this.handleResolvingAddWork}
                  onCompletion={this.handleResolvingAddWork}
                />
              )}
              {!isAddingWork && (
                <Query query={Fetch.projectWorkItems} variables={{ projectId }}>
                  {({ loading, error, data: workItems }) => {
                    console.log('Board > Detail RENDER', workItems);
                    return <div />;
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
