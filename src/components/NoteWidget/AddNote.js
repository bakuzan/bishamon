import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { Button, ClearableInput } from 'mko';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';
import { mapOptimisticResponse } from 'utils/mappers';
import './NoteWidget.scss';

function update(cache, { data: { noteCreate } }) {
  const data = cache.readQuerySafeBIS({ query: Fetch.getNotes });
  const notes = (data && data.notes) || [];

  cache.writeQuery({
    query: Fetch.getNotes,
    data: {
      notes: [...notes, { ...noteCreate }]
    }
  });
}

function AddNote() {
  const [noteText, setNoteText] = useState('');

  return (
    <Mutation mutation={Mutate.noteCreate} onCompleted={() => setNoteText('')}>
      {(postForm) => {
        function handleSubmit(e) {
          e.preventDefault();

          postForm({
            variables: { text: noteText },
            update,
            optimisticResponse: mapOptimisticResponse('noteCreate', 'Note')
          });
        }

        return (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className="note-widget__add">
              <ClearableInput
                id="addNoteText"
                name="addNoteText"
                label="New Note Text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <Button
                type="submit"
                className="note-widget__submit"
                btnStyle="primary"
              >
                Add
              </Button>
            </div>
          </form>
        );
      }}
    </Mutation>
  );
}

export default AddNote;
