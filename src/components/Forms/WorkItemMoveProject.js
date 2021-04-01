import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Query } from 'react-apollo';

import SelectBox from 'meiko/SelectBox';
import DelayedLoader from 'components/DelayedLoader/DelayedLoader';

import ProjectSortOrder from 'constants/projectSortOrder';
import Fetch from 'queries/fetch';

function MoveWorkItemToDifferentProject({ projectId, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const sorting = { field: ProjectSortOrder.Name, direction: 'ASC' };

  if (!showDropdown) {
    return (
      <Button className="change-project" onClick={() => setShowDropdown(true)}>
        Move work item to another project?
      </Button>
    );
  }

  return (
    <Query query={Fetch.projectsAll} variables={{ sorting }}>
      {({ loading, error, data = {} }) => {
        if (loading) {
          return <DelayedLoader />;
        }

        const projects = (data.projects ?? []).map((x) => ({
          value: x.id,
          text: x.name
        }));
        console.log('RENDER PROJECTS > ', projectId, data);
        return (
          <SelectBox
            id="projectId"
            name="projectId"
            text="Project"
            value={projectId}
            onChange={onChange}
            options={projects}
          />
        );
      }}
    </Query>
  );
}

MoveWorkItemToDifferentProject.propTypes = {
  projectId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MoveWorkItemToDifferentProject;
