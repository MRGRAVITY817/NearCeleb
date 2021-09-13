import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@ObjectType()
export class CoreOutput {
  @Field(type => Boolean, { defaultValue: false })
  @IsBoolean()
  ok: boolean;

  @Field(type => String, { nullable: true })
  @IsString()
  error?: string;
}

export class CoreControllerOutput {
  ok: boolean;
  error?: string;
}

export class CoreFileUploadOutput extends CoreControllerOutput {
  url?: string;
}
