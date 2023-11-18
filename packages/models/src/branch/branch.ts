import { SuccessResponse, ErrorResponse, DescriptiveError, StoreBranchStatus } from "src/index";

export interface BranchAddress{
    addressLine1: string;
    addressLine2?: string;
    postCode: string;
    city: string;
    country: string;
}

export interface Branch{
    id: string;
    store: string; //storeId
    url: string;
    address: BranchAddress;
    isActive: boolean;
    inActiveReason?: string;
    image?: IBranchPhoto;
    description?: string;
    name: string;
    status: StoreBranchStatus;
}

export interface IBranchPhoto{
  cover?: string;
  logo?: string;
}

export interface SingleBranchSuccessResponse extends SuccessResponse {
    code: number;
    data: Branch;
  }

  export interface SingleBranchErrorResponse extends ErrorResponse {
    code?: number;
    error: SingleBranchErrorMessage;
    errors: DescriptiveError;
  }

  export const enum SingleBranchErrorMessage {
    CANNOT_FIND_BRANCH = "CANNOT FIND BRANCH",
    INVALID_STORE_ID = "INVALID STORE ID",
    INVALID_BRANCH_ID = "INVALID BRANCH ID",
  }

  export type SingleBranchResponse =
    | SingleBranchErrorResponse
    | SingleBranchSuccessResponse;
