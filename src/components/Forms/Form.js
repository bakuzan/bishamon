import PropTypes from 'prop-types';
import React from 'react';
import { Mutation } from 'react-apollo';

import getEventValue from 'ayaka/getEventValue';
import { default as MForm } from 'meiko/Form';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { ...props.defaults }
    };

    this.handleSetValue = this.handleSetValue.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.handleListCreate = this.handleListCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSetValue(name, value, callback) {
    this.setState(
      (prev) => ({
        values: {
          ...prev.values,
          [name]: value
        }
      }),
      callback
    );
  }

  handleUserInput(e) {
    const { name } = e.target;
    const value = getEventValue(e.target);

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
    return () => {
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
    const { values } = this.state;
    const {
      onCancel,
      defaults,
      mutationProps: { buildOptimisticResponse, ...validMutationProps },
      children,
      ...formProps
    } = this.props;

    const actions = {
      handleSetValue: this.handleSetValue,
      handleUserInput: this.handleUserInput,
      handleListCreate: this.handleListCreate,
      handleListUpdate: this.handleListUpdate
    };

    return (
      <Mutation {...validMutationProps}>
        {(callAPI) => {
          const cancelProps = { onCancel: this.handleCancel, link: true };
          const onSubmit = this.handleSubmit(callAPI);
          const submitProps = {
            onSubmit,
            btnStyle: 'primary'
          };

          return (
            <MForm
              id={formProps.name}
              {...formProps}
              submitOptions={submitProps}
              cancelOptions={cancelProps}
            >
              {children({
                values,
                actions: { ...actions, onSubmit }
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
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
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
