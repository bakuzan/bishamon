import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { Query, Mutation } from 'react-apollo';

import generateUniqueId from 'ayaka/generateUniqueId';
import { Button, Icons, Portal, useOutsideClick } from 'mko';

import Grid from 'components/Grid';
import TabTrap from 'components/TabTrap';
import AddNote from './AddNote';
import UpdateNote from './UpdateNote';
import keyCodes from 'constants/keyCodes';
import Fetch from 'queries/fetch';
import Mutate from 'queries/mutate';

import './NoteWidget.scss';

const exceptionClasses = [
  'update-note__text',
  'update-note__button',
  'update-note__clear-button',
  'note__remove',
  'note-widget-toggle'
];

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
  const [widgetId] = useState(generateUniqueId());
  const [show, setShowNotes] = useState(false);
  const isHidden = !show;
  const toggleBtnId = `toggle-${widgetId}`;

  useOutsideClick(ref.current, (e) => {
    const t = e.target;
    const isEscape = e.key === keyCodes.Escape;
    const noTarget = !t;
    const isNotException =
      t && !exceptionClasses.some((s) => t.className.includes(s));

    if (noTarget || isEscape || isNotException) {
      setShowNotes(false);
    }
  });

  return (
    <Query query={Fetch.getNotes}>
      {({ loading, error, data = {} }) => {
        const notes = data.notes || [];

        return (
          <TabTrap
            isActive={show}
            element="section"
            firstId="closeNotesButton"
            lastId="addNoteButton"
            onDeactivate={() => {
              // TODO, make mko Button forwardRef
              const target = document.getElementById(toggleBtnId);
              target.focus();
            }}
            ref={ref}
            aria-hidden={isHidden}
            className={classNames('note-widget', {
              'note-widget--hidden': isHidden
            })}
          >
            <Portal querySelector="#notes-toggle">
              <Button
                id={toggleBtnId}
                className="note-widget-toggle"
                aria-label="Toggle notes widget"
                icon={`\uD83D\uDDCA\uFE0E`}
                onClick={() => setShowNotes((p) => !p)}
              >
                ({notes.length})
              </Button>
            </Portal>
            <header className="note-widget__header">
              <h2 className="note-widget__title">Notes ({notes.length})</h2>
              <Button
                id="closeNotesButton"
                className="note-widget__close"
                aria-label="Close notes widget"
                icon={Icons.cross}
                onClick={() => setShowNotes(false)}
              />
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
          </TabTrap>
        );
      }}
    </Query>
  );
}

export default NoteWidget;
