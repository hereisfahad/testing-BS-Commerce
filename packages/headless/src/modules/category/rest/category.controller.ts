import {
  Controller, Get, HttpStatus, Param, Res, UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { getCategoryErrorResponseDto, getCategoryRequestDto, getCategorySuccessResponseDto } from '../dto/getCategory.dto';
import { getCategoryListErrorResponseDto, getCategoryListSuccessResponseDto } from '../dto/getCategoryList.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getCategoryBySlugErrorResponseDto, getCategoryBySlugRequestDto, getCategoryBySlugSuccessResponseDto } from '../dto/getCategoryBySlug.dto';

@Controller('category')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Category API')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get(':categoryId')
  @ApiResponse({
    description: 'Get Category Api',
    type: getCategorySuccessResponseDto,
    status: HttpStatus.CREATED
  })
  @ApiResponse({
    description: 'Error Response',
    type: getCategoryErrorResponseDto,
    status: HttpStatus.BAD_REQUEST
  })
  async getCategory(
    @Param() data: getCategoryRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.categoryService.getCategory(data.categoryId);
    res.status(code);
    return response;
  }

  @Get()
  @ApiResponse({
    description: 'Get Category List API',
    type: getCategoryListSuccessResponseDto,
    status: HttpStatus.FOUND,
  })
  @ApiResponse({
    description: 'Error Response',
    type: getCategoryListErrorResponseDto,
    status: HttpStatus.BAD_REQUEST
  })
  async getCategoryList(
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.categoryService.getCategoryList();
    res.status(code);
    return response;
  }

  @Get('slug/:slug')
  @ApiResponse({
    description: 'Get Category By Slug API',
    type: getCategoryBySlugSuccessResponseDto,
    status: HttpStatus.FOUND,
  })
  @ApiResponse({
    description: 'Error Response',
    type: getCategoryBySlugErrorResponseDto,
    status: HttpStatus.BAD_REQUEST
  })
  async getCategoryBySlug(
    @Param() data: getCategoryBySlugRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.categoryService.getCategoryBySlug(data.slug);
    res.status(code);
    return response;
  }
}