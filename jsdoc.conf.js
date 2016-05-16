{
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "include": ["app"],
    "exclude": ["app/public", "app/config.js", "app/jsdoc.conf.js"],
    "includePattern": ".+\\.js(doc)?$",
    "excludePattern": "(^|\\/|\\\\)_|.+[Ss]pec\\.js"
  }
}
