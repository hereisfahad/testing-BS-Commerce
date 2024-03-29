import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Cart, CartProduct, deleteCartItemErrorMessage, deleteCartItemErrorResponse, deleteCartItemRequest, deleteCartItemSuccessResponse, ResponseItem } from "models";


export class deleteCartItemRequestDto implements deleteCartItemRequest{
    @ApiProperty()
    @IsString()
    productId: string;
}
class ResponseItemDto implements ResponseItem{
    @ApiProperty()
    @IsOptional()
    @IsObject()
    product?: CartProduct;

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsNumber()
    quantity: number;
}

class CartDto implements Cart {
    @ApiProperty()
    @IsString()
    id?: string;

    @ApiProperty()
    @IsString()
    userId?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    items?:ResponseItemDto[];
}

export class deleteCartItemSuccessResponseDto implements deleteCartItemSuccessResponse {
    @ApiProperty()
    @IsNumber()
    code: number;

    @ApiProperty()
    @IsObject()
    data: CartDto;
}

export class deleteCartItemErrorResponseDto implements deleteCartItemErrorResponse {
    @ApiProperty({
        default: HttpStatus.BAD_REQUEST,
    })
    code: number;

    @ApiProperty({
        example: deleteCartItemErrorMessage.CAN_NOT_REMOVE_CART_ITEM,
    })
    error: deleteCartItemErrorMessage;

    @ApiProperty()
    errors: string[];
}