import React from 'react';
import { Query } from 'react-apollo';

import { Portal } from 'meiko';
import { ButtonisedNavButton } from 'components/Buttons';
import List from 'components/List/List';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import ProjectView from './ProjectView';
import Fetch from 'queries/fetch';
import Strings from 'constants/strings';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };

    this.handleSelectedCard = this.handleSelectedCard.bind(this);
  }

  handleSelectedCard(selectedId) {
    this.setState(prev => ({
      selectedId: selectedId !== prev.selectedId ? selectedId : null
    }));
  }

  render() {
    const { selectedId } = this.state;
    const { match } = this.props;
    const projectCreateUrl = `${match.path}/create`;

    return (
      <div className="padded padded--standard">
        <div className="button-group right-aligned">
          <ButtonisedNavButton btnStyle="primary" to={projectCreateUrl}>
            Add Project
          </ButtonisedNavButton>
        </div>
        <Query query={Fetch.projectsAll}>
          {({ loading, error, data = {} }) => {
            return (
              <List
                items={data.projects}
                itemTemplate={item => (
                  <ProjectCard
                    key={item.id}
                    data={item}
                    isSelected={selectedId === item.id}
                    onClick={() => this.handleSelectedCard(item.id)}
                  />
                )}
              />
            );
          }}
        </Query>
        {selectedId && (
          <Portal
            querySelector={`#${
              Strings.selectors.projectCardPortal
            }${selectedId}`}
          >
            <ProjectView id={selectedId} closeView={this.handleSelectedCard} />
          </Portal>
        )}
      </div>
    );
  }
}

export default Projects;
