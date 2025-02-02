# Browser Homepage with Bookmark Manager
![ezgif-139037b51ebc7](https://github.com/user-attachments/assets/04541fb4-0d3e-4cac-88e9-ce2a319cf9eb)

## Features

### 1. Bookmark Management
- Create and organize bookmark sets
- Drag-and-drop reordering of bookmarks and sets
- Color-coding for different bookmark categories
- Hide/show individual bookmarks or entire sets
- Add custom keywords to bookmarks for quick access
- Add dividers between bookmarks for better organization

### 2. Smart Search
- Real-time search through bookmarks and their keywords
- Custom search prefixes for quick access to different search engines
- Visual feedback for search matches
- Highlighted keyword matches
- Support for custom search prefix templates (e.g., `-yt: query` for Youtube search)

### 3. Additional Features (things I did when I got bored)
- Web camera quick access
- Stopwatch (type "stopwatch" and press Enter to start)
- Timer (click on time to start, doesn't work very well xd)
- Coin flip animation (type "flip" and press Enter)
- Dynamic background changes based on time of day
- Settings panel accessible via icon or ESC key

## Usage

### Bookmark Management
1. Click the settings icon to access bookmark management
2. Use "Add Bookmark" to create new bookmark sets
3. Add links to sets with optional keywords and dividers
4. Drag and drop to reorder bookmarks and sets
5. Use the eye icon to toggle visibility

### Search
1. Start typing to search through bookmarks
2. Use Enter to navigate to the selected bookmark
3. Add custom search prefixes in settings
4. Use Ctrl + Enter for direct Google search
5. Use keywords for quick access to specific bookmarks

## Keyboard Shortcuts

- `ESC`: Toggle settings panel
- `Enter`: Navigate to selected bookmark
- `Ctrl + Enter`: Google search
- `Ctrl + A`: Clear search input

## Installation

1. Clone the repository
2. Set as homepage or new tab page in your browser settings

### How to set local file as browser homepage (Firefox): ([mozilla.cfg](https://www.reddit.com/r/firefox/comments/ge86z4/newtab_page_to_local_file_firefox_76_redux/))

  > C:\Program Files (x86)\Mozilla Firefox\defaults\pref\local-settings.js
  ```js
  //
  pref("general.config.filename", "mozilla.cfg");
  pref("general.config.obscure_value", 0);
  pref("general.config.sandbox_enabled", false);
  ```

  > C:\Program Files (x86)\Mozilla Firefox\mozilla.cfg
  ```cfg
  //
  var {classes:Cc,interfaces:Ci,utils:Cu} = Components;
  
  /* set new tab page */
  try {
    Cu.import("resource:///modules/AboutNewTab.jsm");
    var newTabURL = "file:///{FILE_PATH_HERE}";
    AboutNewTab.newTabURL = newTabURL;
  } catch(e){Cu.reportError(e);} // report errors in the Browser Console
  ```
