export interface ListAllSubscribers {
  Count: number;
  Data: Datum[];
}

export interface Datum {
  SystemId: null;
  Area: string;
  PublicId: number;
  CountryCode: CountryCode;
  CountryName: CountryName;
  Name: string;
  EndpointsCount: number;
  Email: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneCode: string;
  PhoneCodeAndNumber: string;
  LastActivityUtc: null;
  LastActivity: null;
  LastActivityString: null;
  SubscriptionDate: null;
  SubscriptionMethod: number;
  SubscriptionState: number;
  SubscriptionStateDescription: SubscriptionStateDescription;
  Topics: any[];
  ValidEmail: boolean;
  Activity: Activity;
  ConnectionState: number;
  Id: number;
}

export enum Activity {
  Empty = '--',
}

export enum CountryCode {
  Co = 'CO',
  CountryCodeCo = 'co',
  Es = 'ES',
  Us = 'US',
}

export enum CountryName {
  Colombia = 'Colombia',
  Empty = '',
  Spain = 'Spain',
  UnitedStates = 'United States',
}

export enum SubscriptionStateDescription {
  Pending = 'Pending',
}
export interface Subs {
  Subscribers: Subscriber[];
}

export interface Subscriber {
  Name: string;
  Email: string;
  CountryCode: string;
  PhoneNumber: number;
  JobTitle: string;
  Area: string;
  Topics?: [];
}
