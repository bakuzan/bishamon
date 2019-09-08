import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { Query, Mutation } from 'react-apollo';

import { Button, Icons, Portal, useOutsideClick } from 'mko';
import Grid from 'components/Grid';
import AddNote from './AddNote';
import UpdateNote from './UpdateNote';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';

import './NoteWidget.scss';

function createUpdate(noteId) {
  return function update(cache, { data: { noteRemove } }) {
    if (!noteRemove || (noteRemove && !noteRemove.success)) {
      return;
    }

    const data = cache.readQuerySafeBIS({ query: Fetch.getNotes });
    const notes = (data && data.notes) || [];

    cache.writeQuery({
      query: Fetch.getNotes,
      data: {
        notes: notes.filter((x) => x.id !== noteId)
      }
    });
  };
}

function NoteWidget() {
  const ref = useRef();
  const [show, setShowNotes] = useState(false);

  useOutsideClick(ref.current, (e) => {
    const t = e.target;
    if (!t || (t && t.id !== 'notesToggleButton')) {
      setShowNotes(false);
    }
  });

  return (
    <Query query={Fetch.getNotes}>
      {({ loading, error, data = {} }) => {
        const notes = data.notes || [];

        return (
          <section
            ref={ref}
            className={classNames('note-widget', {
              'note-widget--hidden': !show
            })}
          >
            <Portal querySelector="#notes-toggle">
              <Button
                id="notesToggleButton"
                className="note-widget-toggle"
                aria-label="Toggle notes"
                icon={`\uD83D\uDDCA\uFE0E`}
                onClick={() => setShowNotes((p) => !p)}
              >
                ({notes.length})
              </Button>
            </Portal>
            <header>
              <h2 className="note-widget__title">Notes ({notes.length})</h2>
            </header>
            <Grid className="note-grid" items={notes}>
              {(note) => (
                <li key={note.id} className="note">
                  <UpdateNote {...note} />
                  <Mutation mutation={Mutate.noteRemove}>
                    {(removeNote) => (
                      <Button
                        className="note__remove"
                        aria-label={`Remove ${note.text}`}
                        icon={Icons.cross}
                        onClick={() =>
                          removeNote({
                            variables: { id: note.id },
                            update: createUpdate(note.id),
                            optimisticResponse: {
                              __typename: 'Mutation',
                              noteRemove: {
                                __typename: 'RemoveResponse',
                                success: true,
                                errorMessage: ''
                              }
                            }
                          })
                        }
                      />
                    )}
                  </Mutation>
                </li>
              )}
            </Grid>
            <AddNote />
          </section>
        );
      }}
    </Query>
  );
}

export default NoteWidget;
