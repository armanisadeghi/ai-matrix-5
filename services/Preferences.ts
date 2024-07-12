import { MatrixUser } from "@/types/user.types";

export class Preferences {
    user: MatrixUser;
    darkMode: boolean;
    notifications: boolean;
    autoSave: boolean;
    matrixAISidebar: boolean;
    submitOnEnter: boolean;
    primaryAiModel: string;
    simpleChatSettings: object;

    constructor(
        user: MatrixUser,
        darkMode: boolean,
        notifications: boolean,
        autoSave: boolean,
        matrixAISidebar: boolean,
        submitOnEnter: boolean,
        primaryAiModel: string,
        simpleChatSettings: object,
    ) {
        this.user = user;
        this.darkMode = darkMode;
        this.notifications = notifications;
        this.autoSave = autoSave;
        this.matrixAISidebar = matrixAISidebar;
        this.submitOnEnter = submitOnEnter;
        this.primaryAiModel = primaryAiModel;
        this.simpleChatSettings = simpleChatSettings;
    }
}

export class UserPreferences {
    private static instance: UserPreferences;
    private preferences: Record<string, any>;

    private constructor() {
        this.preferences = {};
    }

    public static getInstance(): UserPreferences {
        if (!UserPreferences.instance) {
            UserPreferences.instance = new UserPreferences();
        }
        return UserPreferences.instance;
    }

    setPreference(key: string, value: any) {
        this.preferences[key] = value;
    }

    getPreference(key: string): any {
        return this.preferences[key];
    }

    getAllPreferences(): Record<string, any> {
        return this.preferences;
    }

    clearPreferences() {
        this.preferences = {};
    }

    setUserPreference(user: MatrixUser, key: string, value: any) {
        if (user.matrixId) {
            if (!this.preferences[user.matrixId]) {
                this.preferences[user.matrixId] = {};
            }
            this.preferences[user.matrixId][key] = value;
        } else {
            console.error("User matrixId is undefined or null");
        }
    }

    getUserPreference(user: MatrixUser, key: string): any {
        return user.matrixId ? this.preferences[user.matrixId]?.[key] : undefined;
    }
}
