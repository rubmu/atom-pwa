import { ISettings } from "./AppSettings";
import Locale from "./Locale";
import { DEFAULT_THEME } from "./Theme";

const defaultSettings: ISettings = {
  locale: Locale.getBrowserLocale(),
  tests: {
    periodicTable: {
      elements: null
    },
    valences: {
      elements: null
    }
  },
  theme: DEFAULT_THEME,
  migrations: [0],
  rateAppDialog: false
};

export default defaultSettings;
