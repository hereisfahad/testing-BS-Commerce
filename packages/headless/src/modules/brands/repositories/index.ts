import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

import { IBrandDatabase } from './brand.database.interface';
import { Brand } from 'src/entity/brand';
import { BrandDto } from 'src/modules/brands/dto/brandDto';
import { CreateBrandRequestDto } from 'src/modules/brands/dto/createBrandDto';
import { GetAllBrandsDto } from 'src/modules/brands/dto/getAllBrandsDto';
import { UpdateBrandRequestdto, UpdateBrandResponseDto } from 'src/modules/brands/dto/updateBrandDto';

@Injectable()
export class BrandRepository {
    constructor(private readonly db: IBrandDatabase) { }

    async getBrandByName(brandName: string): Promise<Brand | null> {
       return await this.db.getBrandByName(brandName);   
    }
    
    
    async getBrandById(brandId: string): Promise<BrandDto | null> {
        return await this.db.getBrandById(brandId);   
     }

    async getAllBrands(skip?: number, limit?: number): Promise<GetAllBrandsDto> {
        return await this.db.getAllBrands(skip, limit);
    }
    
    async createBrand(brand: CreateBrandRequestDto): Promise<BrandDto | null> {
        const id = crypto.randomUUID();
        const newBrand = {...brand, id};
        return await this.db.addNewBrand(newBrand);  
    }

    async updateBrandById(brandId: string, brandUpdates: UpdateBrandRequestdto): Promise<BrandDto | null>{
        return await this.db.updateBrandById(brandId, brandUpdates);
    }

    async deleteBrandById(brandId: string): Promise<BrandDto | null>{
        return await this.db.deleteBrandById(brandId);
    }
}