import { registerEnumType } from 'type-graphql';

export enum VideoType {
  NOVEL = 'novel',
  SERIAL = 'serial',
  TV = 'tv',
}

registerEnumType(VideoType, {
  name: 'VideoType',
  description: 'The basic video types'
});
