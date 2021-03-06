const themes = new Map([
  ['default', { text: 'Classic (Light)', value: 'default' }],
  ['theme-two', { text: 'Suit (Dark)', value: 'theme-two' }]
]);

/*
  ['theme-three', { text: 'Knight', value: 'theme-three' }],
  ['theme-four', { text: 'Warlord', value: 'theme-four' }],
  ['theme-five', { text: 'Kimono', value: 'theme-five' }]
*/

export default Object.freeze({
  selectors: {
    swimlaneCardPortal: 'swimlane-card-view-anchor-',
    projectCardPortal: 'project-card-view-anchor-'
  },
  appSettingsStorage: 'bishamonAppSettings',
  themes,
  defaultTheme: themes.get('default').value,
  defaultColour: '#fff',
  dataTypes: {
    project: 'Project',
    workItem: 'WorkItem',
    task: 'Task'
  },
  noDescription: 'N/A'
});
