import React from 'react';
import { Mutation } from "react-apollo";

import { Form, ClearableInput, ChipListInput, SelectBox, Utils } from 'meiko';
import {PROJECT_LIST_URL} from 'constants/routes';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import {enumsToSelectBoxOptions, projectColourModel} from 'utils/mappers';

const ProjectTypes = Object.freeze({
  application: 1,
  training: 2
});
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

  handleListUpdate(...test) {
    console.log("update", test)
  }

  handleListCreate(newColour) {
    console.log("create list item", newColour, this.state)
    this.setState(prev => {
      console.log(prev)
      return {
        values: {
          ...prev.values,
          colours: [
            ...prev.colours,
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
      console.log("submit", this.state)
      projectCreate({
        variables: { ...this.state.values }
      });
    };
  }

  handleCompletion(...test) {
    console.log("complete", test)
    console.log("porps", this.props)
    this.props.history.push(PROJECT_LIST_URL);
  }

  render() {
    const { values } = this.state;
    const cancelProps = { onCancel: this.handleCancel }

    return (
      <Mutation
        mutation={Mutate.projectCreate}
        update={(cache, { data: { projectCreate } }) => {
          const { projects } = cache.readQuery({ query: Fetch.projectsAll });
          cache.writeQuery({
            query: Fetch.projectsAll,
            data: { projects: projects.concat([projectCreate]) }
          });
        }}
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
              chipOptions={[{ id: '__placeholder', code: '___' }]}
              updateChipList={this.handleListUpdate}
              createNew={this.handleListCreate}
            />
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default ProjectsCreate;
