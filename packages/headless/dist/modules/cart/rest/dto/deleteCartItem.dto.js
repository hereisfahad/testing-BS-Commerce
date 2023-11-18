"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItemErrorResponseDto = exports.deleteCartItemSuccessResponseDto = exports.deleteCartItemRequestDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const cartProductDto_1 = require("./cartProductDto");
class deleteCartItemRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], deleteCartItemRequestDto.prototype, "productId", void 0);
exports.deleteCartItemRequestDto = deleteCartItemRequestDto;
class ResponseItemDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: cartProductDto_1.CartProductDto }),
    (0, class_transformer_1.Type)(() => cartProductDto_1.CartProductDto),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", cartProductDto_1.CartProductDto)
], ResponseItemDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResponseItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResponseItemDto.prototype, "quantity", void 0);
class CartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CartDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CartDto.prototype, "items", void 0);
class deleteCartItemSuccessResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], deleteCartItemSuccessResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", CartDto)
], deleteCartItemSuccessResponseDto.prototype, "data", void 0);
exports.deleteCartItemSuccessResponseDto = deleteCartItemSuccessResponseDto;
class deleteCartItemErrorResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        default: common_1.HttpStatus.BAD_REQUEST,
    }),
    __metadata("design:type", Number)
], deleteCartItemErrorResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "CAN_NOT_REMOVE_CART_ITEM",
    }),
    __metadata("design:type", String)
], deleteCartItemErrorResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], deleteCartItemErrorResponseDto.prototype, "errors", void 0);
exports.deleteCartItemErrorResponseDto = deleteCartItemErrorResponseDto;
//# sourceMappingURL=deleteCartItem.dto.js.map