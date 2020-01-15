export interface ISPRoleAssignment {
    PrincipalId: number;
    Member: ISPMemberInfo;
    RoleDefinitionBindings: ISPRoleDefinitionBinding[];
}

export interface ISPMemberInfo {
    Id: number;
    Title: string;
    PrincipalType: MemberType;
    Users?:ISPUser[];
}

export enum MemberType {
    Group = 8,
    User = 1
}

export interface ISPRoleDefinitionBinding {
    Id: number;
    Name: string;
}

export interface ISPUser {
    Title: string;
}