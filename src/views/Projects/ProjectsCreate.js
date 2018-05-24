import React from 'react';
import { Mutation } from "react-apollo";

import { Form, ClearableInput, ChipListInput, SelectBox, Utils } from 'meiko';
import {PROJECT_LIST_URL} from 'constants/routes';
import ProjectTypes from 'constants/project-types';
import Mutate from 'queries/mutate';
import {enumsToSelectBoxOptions, projectColourModel} from 'utils/mappers';

const PROJECT_TYPES = enumsToSelectBoxOptions(ProjectTypes);
const projectCreateDefaults = Object.freeze({
  name: '',
  type: ProjectTypes.application,
  colours: []
});

class ProjectsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      values: {...projectCreateDefaults}
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.handleListCreate = this.handleListCreate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
  }

  handleUserInput(e) {
    const {name} = e.target;
    const value = Utils.Common.getEventValue(e.target);
    console.log(name, value)
    this.setState(prev => ({
        values: {
          ...prev.values,
          [name]: value
        }
      })
    );
  }

  handleListUpdate(name, colours) {
    this.setState(prev => ({
          values: {
            ...prev.values,
            colours
          }
      })
    );
  }

  handleListCreate(newColour) {
    this.setState(({ values }) => {
      const { colours } = values;
      return {
        values: {
          ...values,
          colours: [
            ...colours,
            newColour.code
          ]
        }
      };
    });
  }

  handleCancel() {
    this.props.history.push(PROJECT_LIST_URL);
  }

  handleSubmit(projectCreate) {
    return (...test) => {
      projectCreate({
        variables: { ...this.state.values }
      });
    };
  }

  handleCompletion(...test) {
    this.props.history.push(PROJECT_LIST_URL);
  }

  render() {
    const { values } = this.state;
    const cancelProps = { onCancel: this.handleCancel }

    return (
      <Mutation
        mutation={Mutate.projectCreate}
        onCompleted={this.handleCompletion}
      >
      {(projectCreate, { data }) => {
        const submitProps = { onSubmit: this.handleSubmit(projectCreate) };
        console.log("RENDER MUT", this.state)
        return (
          <Form
            name="project-create"
            submitOptions={submitProps}
            cancelOptions={cancelProps}
          >
            <ClearableInput
              name="name"
              label="name"
              value={values.name}
              onChange={this.handleUserInput}
            />
            <SelectBox
              name="type"
              text="type"
              value={values.type}
              onSelect={this.handleUserInput}
              options={PROJECT_TYPES}
            />
            <ChipListInput
              tagClassName="bishamon-tag"
              menuClassName="bishamon-autocomplete-menu"
              label="Colours"
              attr="code"
              name="colours"
              chipsSelected={values.colours.map(projectColourModel)}
              chipOptions={[{ code: '____' }]}
              updateChipList={this.handleListUpdate}
              createNew={this.handleListCreate}
              createNewMessage="Add Colour"
            />
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default ProjectsCreate;
