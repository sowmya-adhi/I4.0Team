export class UserModel{
    username:string;
    password:string;
    role:string;
}

export class UserModelAuth{
    mailId:string;
    password:string;
    AuthorizationLevel:string;
    userName: any;
}


export class UserDetails {
    [x: string]: any;
    ID: string;
    firstName: string;
    lastName:string;
    role: string;
    roleId: string;
    phoneNumber: string;
    mailId: string;
    pagePermissions:any[]
}

