import { InputType, Field } from 'type-graphql';
import { VideoType } from './video.enum';

@InputType()
class VideoSearchInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  type: VideoType;

  @Field({ nullable: true })
  category?: string;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ defaultValue: 10 })
  limit: number;
}

export default VideoSearchInput;
