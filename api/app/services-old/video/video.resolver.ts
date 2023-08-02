import { Resolver, Query, Arg, Int } from 'type-graphql';
import { createVideoSamples } from './video.sample';
import Video, { VideoResponse } from './video.type';
import { filterItems, getRelatedItems } from '../../helpers/filter';

@Resolver()
export class VideoResolver {
  private readonly items: Video[] = createVideoSamples();

  @Query({ description: 'Get all the videos' })
  videos(
    @Arg('limit', (type) => Int, { defaultValue: 10 }) limit: number,
    @Arg('offset', (type) => Int, { defaultValue: 0 }) offset: number,
    @Arg('type', { nullable: true }) type?: string,
    @Arg('text', { nullable: true }) text?: string,
    @Arg('category', { nullable: true }) category?: string
  ): VideoResponse {
    const total = this.items.length;
    const filteredData = filterItems(
      this.items,
      limit,
      offset,
      text,
      type,
      category
    );
    return new VideoResponse({
      total: total,
      ...filteredData,
    });
  }
  @Query(() => Video)
  listVideo(
    @Arg('slug', type => String) slug?: string,
    @Arg('type', { nullable: true }) type?: string
  ): Video[] {
    if (slug) {
      return this.items.filter(item => item.slug === slug);
    } else if (type) {
      return this.items.filter(item => item.type === type);
    } else {
      return this.items
    }
  }

  @Query(() => Video)
  async video(
    @Arg('slug', (type) => String) slug: string
  ): Promise<Video | undefined> {
    return await this.items.find((item) => item.slug === slug);
  }

  @Query(() => [Video], { description: 'Get the Related videos' })
  async relatedVideos(
    @Arg('slug', (slug) => String) slug: string,
    @Arg('type', { nullable: true }) type?: string
  ): Promise<any> {
    const relatedItem = await getRelatedItems(type, slug, this.items);
    return relatedItem;
  }
}
