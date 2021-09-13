import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';
import { Roles } from 'src/celebs/entities/roles.entity';
import { Social } from 'src/celebs/entities/social.entity';
import { Gender } from 'src/celebs/enums/gender.enum';
import { Nationality } from 'src/celebs/enums/Nationality.enum';

@InputType('EditVoteItemInputType', { isAbstract: true })
@ObjectType()
export class EditVoteItem {
  @Field(type => String, { nullable: true })
  @IsString()
  korName?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  engName?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  realName?: string;

  @Field(type => Gender, { nullable: true })
  gender?: Gender;

  @Field(type => String, { nullable: true })
  @IsString()
  profileImage?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  secondImage?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  bgImage?: string;

  @Field(type => Date, { nullable: true })
  @IsDate()
  birthDate?: Date;

  @Field(type => Date, { nullable: true })
  @IsDate()
  debutDate?: Date;

  @Field(type => Nationality, { nullable: true })
  nationality?: Nationality;

  @Field(type => String, { nullable: true })
  @IsString()
  description?: string;

  @Field(type => Roles, { nullable: true })
  roles?: Roles;

  @Field(type => Social, { nullable: true })
  social?: Social;

  @Field(type => String, { nullable: true })
  @IsString()
  company?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  companyWebsite?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  group?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  fandom?: string;

  @Field(type => String, { nullable: true })
  @IsString()
  fandomIcon?: string;
}
