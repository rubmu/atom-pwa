import defaultSettings from "./defaultSettings";

export interface ITestElementSettings {
  atomic: number;
  enabled: boolean;
  stats: {
    times: number;
    right: number;
    wrong: number;
  };
}

export interface IValencesTestSettings {
  elements: ITestElementSettings[];
}

export interface IPeriodicTableTestSettings {
  elements: ITestElementSettings[];
}

export interface ISettings {
  [key: string]: any;
  theme: string;
  locale: string;
  tests: {
    valences: IValencesTestSettings;
    periodicTable: IPeriodicTableTestSettings;
  };
  migrations: number[];
}

class AppSettings {
  private static STORAGE_KEY = "atom:settings";

  public settings: ISettings;

  public loadSettings() {
    let appSettings: ISettings;

    try {
      appSettings = JSON.parse(localStorage.getItem(AppSettings.STORAGE_KEY));
    } catch (e) {
    } finally {
      this.executeMigrations(appSettings);
    }
  }

  public save() {
    localStorage.setItem(
      AppSettings.STORAGE_KEY,
      JSON.stringify(this.settings)
    );
  }

  private setDefaultSettings() {
    this.settings = defaultSettings;
    this.save();
  }

  private executeMigrations(settings: ISettings) {
    const latestMigration = this.getLatestMigration(settings);
    const migrateTo = latestMigration + 1;

    switch (migrateTo) {
      case 0:
        settings = defaultSettings;
      default:
        this.settings = settings;
        this.save();
    }
  }

  private getLatestMigration(settings: ISettings) {
    if (!settings || !settings.migrations || !settings.migrations.length) {
      return -1;
    }

    const { migrations } = settings;

    return migrations[migrations.length - 1];
  }
}

export default new AppSettings();
