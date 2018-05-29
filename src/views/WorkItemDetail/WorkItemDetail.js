import React from 'react';
import { Query } from 'react-apollo';

import { Button } from 'components/Buttons';
import Board from 'components/Board/Board';
import ProjectInformation from 'components/ProjectInformation/ProjectInformation';
import WorkItemDetailCreate from './WorkItemDetailCreate';
import Fetch from 'queries/fetch';

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

  render() {
    const { isAdding } = this.state;
    const { match } = this.props;
    const workItemId = Number(match.params.workItemId);

    return (
      <Query query={Fetch.workItemInformation} variables={{ id: workItemId }}>
        {({ loading, error, data = {} }) => {
          return (
            <ProjectInformation
              data={data.workItem}
              headerContent={
                <div className="button-group right-aligned">
                  <Button btnStyle="primary" onClick={this.handleAdd}>
                    Add Task
                  </Button>
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
                  {({ loading, error, data }) => {
                    return <Board data={data} />;
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
