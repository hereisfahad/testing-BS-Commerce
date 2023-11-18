import { BrandDatabase as BrandDatabaseMysql } from './mysql/brand';
import { CartDatabase as CartDatabaseMongo } from './mongodb/cart';
import { CategoryDatabase as CategoryDatabaseMongo } from './mongodb/category';
import { CompareDatabase as CompareDatabaseMongo } from './mongodb/compare/index';
import { CustomerDatabase as CustomerDatabaseMongo } from './mongodb/customer';
import { OrderDatabase as OrderDatabaseMongo } from './mongodb/order';
import { ProductDatabase as ProductDatabaseMongo } from './mongodb/product';
import { UserDatabase as UserDatabaseMongo } from './mongodb/user';
import { ManufacturerDatabase as ManufacturerDatabaseMysql } from './mysql/manufacturer/manufacturer';
import { WishListDatabase as WishListDatabaseMongo } from './mongodb/wishList';
import { TagsDatabase as TagsDatabaseMongo } from './mongodb/tags';
declare type CLASS_NAME = 'WISHLIST' | 'USER' | 'PRODUCT' | 'MANUFACTURER' | 'CATEGORY' | 'CART' | 'CUSTOMER_AUTH' | 'COMPARE' | 'MEDIA' | 'ORDER' | 'BRAND' | 'TAGS' | 'CUSTOMER';
export declare function ResolveDatabaseDependency(className: CLASS_NAME): typeof BrandDatabaseMysql | typeof CartDatabaseMongo | typeof CategoryDatabaseMongo | typeof CompareDatabaseMongo | typeof CustomerDatabaseMongo | typeof OrderDatabaseMongo | typeof ProductDatabaseMongo | typeof UserDatabaseMongo | typeof ManufacturerDatabaseMysql | typeof WishListDatabaseMongo | typeof TagsDatabaseMongo;
export {};