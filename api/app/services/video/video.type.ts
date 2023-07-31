import { ObjectType, Field, ID } from 'type-graphql';
import { VideoType } from './video.enum';
import Category from '../category/category.type';
import Gallery from './gallery.type';
import PaginatedResponse from '../../helpers/paginated-response';

@ObjectType()
export default class Video {
  @Field()
  id: number;

  @Field()
  slug: string;

  @Field()
  episode: number;

  @Field()
  isCencor: boolean;

  @Field()
  title: string;

  @Field(() => VideoType)
  type: VideoType;

  @Field(() => [Category])
  categories: Category[];

  @Field()
  image: string;

  @Field(() => [Gallery])
  gallery: Gallery[];

  @Field()
  description: string;

  @Field()
  publishDate: Date;
}

// TODO: Need to change this in next update

// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class VideoResponse extends PaginatedResponse(Video) {
  // simple helper for creating new instances easily
  constructor(videoResponse: VideoResponse) {
    super();
    Object.assign(this, videoResponse);
  }

  // you can add more fields here if you need
}
