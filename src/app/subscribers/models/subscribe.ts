export class Subscribe {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: number;
  jobTitle: string;
  area: string;
  topics: string[];

  constructor(
    name: string,
    email: string,
    countryCode: string,
    phoneNumber: number,
    jobTitle: string,
    area: string,
    topics: string[]
  ) {
    this.name = name;
    this.email = email;
    this.countryCode = countryCode;
    this.phoneNumber = phoneNumber;
    this.jobTitle = jobTitle;
    this.area = area;
    this.topics = topics;
  }
}
