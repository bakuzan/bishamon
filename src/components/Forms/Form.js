import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import { Form as MForm, Utils } from 'meiko';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { ...props.defaults }
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.handleListCreate = this.handleListCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(e) {
    const { name } = e.target;
    const value = Utils.Common.getEventValue(e.target);

    this.setState((prev) => ({
      values: {
        ...prev.values,
        [name]: value
      }
    }));
  }

  handleListUpdate(name, items) {
    const updatedList = items || [];

    this.setState((prev) => ({
      values: {
        ...prev.values,
        [name]: updatedList
      }
    }));
  }

  handleListCreate(newItem, name) {
    this.setState(({ values }) => {
      return {
        values: {
          ...values,
          [name]: [...values[name], newItem.code]
        }
      };
    });
  }

  handleCancel(...values) {
    if (this.props.onCancel) {
      this.props.onCancel(...values);
    }
  }

  handleSubmit(callApi) {
    return (...test) => {
      const { mutationProps } = this.props;
      const passedVariables = mutationProps.variables || {};

      const optimisticResponse = mutationProps.buildOptimisticResponse
        ? mutationProps.buildOptimisticResponse(this.state.values)
        : undefined;

      const craftedValues = !mutationProps.curateValues
        ? { ...passedVariables, ...this.state.values }
        : mutationProps.curateValues(this.state.values, passedVariables);

      callApi({
        variables: { ...craftedValues },
        optimisticResponse
      });
    };
  }

  render() {
    const {
      className,
      formName,
      mutationProps: { buildOptimisticResponse, ...validMutationProps }
    } = this.props;
    const { values } = this.state;
    const cancelProps = { onCancel: this.handleCancel };
    const actions = {
      handleUserInput: this.handleUserInput,
      handleListCreate: this.handleListCreate,
      handleListUpdate: this.handleListUpdate
    };

    return (
      <Mutation {...validMutationProps}>
        {(callAPI, { data }) => {
          const submitProps = { onSubmit: this.handleSubmit(callAPI) };

          return (
            <MForm
              id={formName}
              className={className}
              name={formName}
              submitOptions={submitProps}
              cancelOptions={cancelProps}
            >
              {this.props.children({
                values,
                actions
              })}
            </MForm>
          );
        }}
      </Mutation>
    );
  }
}

Form.defaultProps = {
  defaults: {}
};

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  defaults: PropTypes.object,
  children: PropTypes.func.isRequired,
  mutationProps: PropTypes.shape({
    mutation: PropTypes.object.isRequired,
    onCompletion: PropTypes.func,
    buildOptimisticResponse: PropTypes.func,
    curateValues: PropTypes.func
  }).isRequired
};

export default Form;
