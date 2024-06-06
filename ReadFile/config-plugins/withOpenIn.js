const { withInfoPlist } = require("@expo/config-plugins");

const withOpenInImportSupport = (config) => {
  return withInfoPlist(config, (config) => {
    config.modResults = {
      ...config.modResults,
      ...includesEverything,
    };
    return config;
  });
};

const includesEverything = {
  CFBundleDocumentTypes: [
    {
      CFBundleTypeName: "PDF Document",
      LSHandlerRank: "Alternate",
      LSItemContentTypes: ["com.adobe.pdf"],
    },
  ],
};

module.exports = withOpenInImportSupport;
