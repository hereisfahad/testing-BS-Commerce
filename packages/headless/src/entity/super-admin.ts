export class SuperAdminRoleInfo {
  name: string;
  roleId: string;
  roleType: string;
}
export class SuperAdmin {
  id?: string;
  firstName: string;
  lastName: string;
  role?: SuperAdminRoleInfo;
  storeId?: string;
  branchId?: string[];
  email: string;
  countryCode?: string;
  phone?: string;
  password?: string;
  isMfaEnabled?: boolean;
  mfaType?: string;
}

export class SuperAdminInfo {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  storeId: string;
  branchIds?: string[];
  email: string;
  countryCode: string;
  phone: string;
}
