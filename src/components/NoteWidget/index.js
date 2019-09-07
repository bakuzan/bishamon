import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';

import { Button, ClearableInput, Icons } from 'mko';
import Grid from 'components/Grid';
import AddNote from './AddNote';
import Fetch from 'queries/fetch';

import './NoteWidget.scss';

function NoteWidget() {
  const [showSidebar, setShowSidebar] = useState(false);
  /* TODO
   * Toggle text to input for editing
   */

  return (
    <Query query={Fetch.getNotes}>
      {({ loading, error, data = {} }) => {
        const notes = data.notes || [];

        return (
          <section className="note-widget">
            <header>
              <h2 className="note-widget__title">Notes ({notes.length})</h2>
            </header>
            <Grid className="note-grid" items={notes}>
              {(note) => (
                <li key={note.id}>
                  <div>{note.text}</div>
                  <Button
                    icon={Icons.cross}
                    onClick={() => console.log('ReMOVE', note.id)}
                  />
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
