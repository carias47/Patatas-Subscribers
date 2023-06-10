export interface LoginResponse {
  Status: number;
  User: User;
  Token: string;
  Message: null;
  TwoFactorType: null;
  AllowedTwoFactorTypes: null;
  Permissions: Permission[];
  Features: Feature[];
  Locations: any[];
  LastLocationId: number;
  Preferences: Preference[];
  UserType: string;
  Email: string;
  FirstName: string;
  LastName: string;
  CompanyName: string;
  TimeZoneInfo: null;
  RefreshToken: string;
}

export interface Feature {
  M: string;
  F: string;
}

export interface Permission {
  M: string;
  D: string;
}

export interface Preference {
  PreferenceKey: string;
  PreferenceValue: string;
}
export interface User {
  FirstName: string;
  LastName: string;
  Email: string;
  Token: string;
  Status: number;
}
