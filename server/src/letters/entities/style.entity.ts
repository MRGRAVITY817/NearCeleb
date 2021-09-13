import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('StyleInputType', { isAbstract: true })
@ObjectType()
export class Style {
  @Field(type => String)
  pattern: string;

  @Field(type => String)
  font: string;

  @Field(type => String)
  paper: string;
}
