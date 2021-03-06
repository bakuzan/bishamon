import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { Button } from 'meiko/Button';
import ClearableInput from 'meiko/ClearableInput';
import Icons from 'meiko/constants/icons';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';

import './NoteWidget.scss';

function update(cache, { data: { noteUpdate } }) {
  const data = cache.readQuerySafeBIS({ query: Fetch.getNotes });
  const notes = (data && data.notes) || [];

  cache.writeQuery({
    query: Fetch.getNotes,
    data: {
      notes: notes.map((x) =>
        x.id !== noteUpdate.id ? x : { ...x, text: noteUpdate.text }
      )
    }
  });
}

function UpdateNote({ id, text }) {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState(text);

  return (
    <Mutation
      mutation={Mutate.noteUpdate}
      onCompleted={() => setEditMode(false)}
    >
      {(postForm) => {
        function handleSubmit(e) {
          e.preventDefault();
          const values = { id: id, text: noteText };

          postForm({
            variables: values,
            update,
            optimisticResponse: {
              __typename: 'Mutation',
              noteUpdate: {
                __typename: 'Note',
                ...values
              }
            }
          });
        }

        return (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="update-note">
              {!editMode && (
                <Button
                  className="update-note__text"
                  onClick={() => setEditMode(true)}
                >
                  {text}
                </Button>
              )}
              {editMode && (
                <div className="update-note__edit">
                  <ClearableInput
                    id="noteText"
                    name="noteText"
                    label="New Note Text"
                    value={noteText}
                    clearButtonProps={{
                      className: 'update-note__clear-button'
                    }}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="update-note__button update-note__submit"
                    aria-label="Save note"
                    icon={Icons.save}
                  />
                  <Button
                    type="submit"
                    className="update-note__button"
                    aria-label="Cancel edit note"
                    icon={Icons.cross}
                    onClick={() => {
                      setEditMode(false);
                      setNoteText(text);
                    }}
                  />
                </div>
              )}
            </div>
          </form>
        );
      }}
    </Mutation>
  );
}

UpdateNote.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default UpdateNote;
