export interface IUser {
    userName: string;
    email: string;
    password: string;
    role: 0 | 1; // 0 for Admin, 1 for Member
}