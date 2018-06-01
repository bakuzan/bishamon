const themes = new Map([
  ['default', { text: 'Classic', value: 'default' }],
  ['theme-two', { text: 'Knight', value: 'theme-two' }]
]);

export default Object.freeze({
  selectors: {
    swimlaneCardPortal: 'swimlane-card-view-anchor-'
  },
  appSettingsStorage: 'bishamonAppSettings',
  themes,
  defaultTheme: themes.get('default').value
});
