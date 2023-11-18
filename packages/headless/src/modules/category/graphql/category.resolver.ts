import { UseGuards } from "@nestjs/common";
import { Query, Args, Resolver, Mutation } from "@nestjs/graphql";
import { RolesGuard } from "src/guards/auth.guard";
import { CategoryService } from "../services";
import { CategoryListResponse, CategoryResponse, createCategoryRequestSchema, getCategoryBySlugRequestSchema, getCategoryRequestSchema } from "./category.model";
import { Helper } from 'src/helper/helper.interface';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService, private helper: Helper) { }

  @Query(returns => CategoryResponse, { nullable: true })
  async getCategory(
    @Args('data') data: getCategoryRequestSchema) {
    const res = await this.categoryService.getCategory(data.categoryId);
    return this.helper.serviceResponse.graphqlResponse(res);
  }

  @Query(returns => CategoryListResponse, { nullable: true })
  async getCategoryList() {
    const res: any = await this.categoryService.getCategoryList();
    return this.helper.serviceResponse.graphqlResponse(res);
  }

  @Query(returns => CategoryResponse, { nullable: true })
  async getCategoryBySlug(
    @Args('data') data: getCategoryBySlugRequestSchema) {
    const res = await this.categoryService.getCategoryBySlug(data.slug);
    return this.helper.serviceResponse.graphqlResponse(res);
  }

  @UseGuards(new RolesGuard(['admin']))
  @Mutation(returns => CategoryResponse)
  async createCategory(
    @Args('category') category: createCategoryRequestSchema,
  ) {
    const res = await this.categoryService.createCategory(category);
    return this.helper.serviceResponse.graphqlResponse(res);
  }
}