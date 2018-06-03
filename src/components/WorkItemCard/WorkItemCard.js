import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Button } from 'components/Buttons';
import Mutate from 'queries/mutate';
import { InProgress } from 'constants/status';
import { mapWorkItemViewToOptimisticResponse } from 'utils/mappers';

import './WorkItemCard.css';

class WorkItemCard extends React.PureComponent {
  render() {
    const { data } = this.props;
    const type = data.type ? data.type.toLowerCase() : '';
    const status = InProgress;
    const optimisticResponse = mapWorkItemViewToOptimisticResponse({
      ...data,
      status
    });
    const workItemUpdateVariables = {
      id: data.id,
      status
    };

    return (
      <Mutation
        mutation={Mutate.workItemStatusUpdate}
        variables={workItemUpdateVariables}
        optimisticResponse={optimisticResponse}
      >
        {(updateWorkItem, _) => (
          <li
            className={classNames('work-item-card', [
              `work-item-card--type_${type}`
            ])}
          >
            <div>{data.name}</div>
            <div className="work-item-card__detail">
              <div>{data.description}</div>
              <div className="button-group align-right">
                <Button onClick={updateWorkItem}>Continue Work</Button>
              </div>
            </div>
          </li>
        )}
      </Mutation>
    );
  }
}

WorkItemCard.defaultProps = {
  data: {}
};

WorkItemCard.propTypes = {
  data: PropTypes.object
};

export default WorkItemCard;
