import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType('ContentsInputType', { isAbstract: true })
@ObjectType()
export class Contents {
  @Field(type => String, { nullable: true })
  receiver: string;

  @Field(type => String, { nullable: true })
  heading?: string;

  @Field(type => String, { nullable: true })
  body?: string;

  @Field(type => String, { nullable: true })
  ending?: string;

  @Field(type => String, { nullable: true })
  sender: string;

  @Field(type => String, { nullable: true })
  signature: string;
}
