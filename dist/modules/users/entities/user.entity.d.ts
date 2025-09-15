export type UserRole = 'admin' | 'client';
export declare class User {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=user.entity.d.ts.map