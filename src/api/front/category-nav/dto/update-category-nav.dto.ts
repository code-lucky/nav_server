import { PartialType } from '@nestjs/swagger';
import { CreateCategoryNavDto } from './create-category-nav.dto';

export class UpdateCategoryNavDto extends PartialType(CreateCategoryNavDto) {}
