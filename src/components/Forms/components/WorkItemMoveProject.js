import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Query } from 'react-apollo';

import SelectBox from 'meiko/SelectBox';
import { Button } from 'components/Buttons';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';

import ProjectSortOrder from 'constants/projectSortOrder';
import Fetch from 'queries/fetch';

import './WorkItemMoveProject.scss';

function MoveWorkItemToDifferentProject({ projectId, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const sorting = { field: ProjectSortOrder.Name, direction: 'ASC' };

  if (!showDropdown) {
    return (
      <div className="change-project">
        <Button
          className="change-project__button"
          btnStyle="accent"
          onClick={() => setShowDropdown(true)}
        >
          Move work item to another project?
        </Button>
      </div>
    );
  }

  return (
    <div className="change-project">
      <Query query={Fetch.projectsAll} variables={{ sorting }}>
        {({ loading, error, data = { projects: [] } }) => {
          if (loading) {
            return <DelayedLoader />;
          }

          const options = data.projects.map((x) => ({
            value: x.id,
            text: x.name
          }));

          return (
            <SelectBox
              id="projectId"
              name="projectId"
              text="Project"
              value={projectId}
              onChange={onChange}
              options={options}
            />
          );
        }}
      </Query>
    </div>
  );
}

MoveWorkItemToDifferentProject.propTypes = {
  projectId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MoveWorkItemToDifferentProject;
