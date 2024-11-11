const loc: Record<string, string> = {
  'server-started': `
============================
{{serverName}} successfully started!
Url: {{url}}:{{port}};
Listening on port {{port}};
============================`,
  'invalid-input': 'Invalid input',
  'user-not-found': 'User not found',
  'old-password-is-incorrect': 'Old password is incorrect',
  'user-already-exists': 'User already exists',
  'track-not-found': 'Track not found',
  'album-not-found': 'Album not found',
  'artist-not-found': 'Artist not found',
  'album-never-existed': 'Album never existed',
  'track-never-existed': 'Track never existed',
  'artist-never-existed': 'Artist never existed',
  'track-not-in-favorites': 'Track not in favorites',
  'album-not-in-favorites': 'Album not in favorites',
  'artist-not-in-favorites': 'Artist not in favorites',
};

export default loc;
