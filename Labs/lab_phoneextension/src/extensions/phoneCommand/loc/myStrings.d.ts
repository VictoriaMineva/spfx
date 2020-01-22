declare interface IPhoneCommandCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'PhoneCommandCommandSetStrings' {
  const strings: IPhoneCommandCommandSetStrings;
  export = strings;
}
