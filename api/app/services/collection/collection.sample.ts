import Collection from './collection.type';
import { plainToClass } from 'class-transformer';

const loadCategories = (): Collection[] => {
  return plainToClass(Collection, [
    {
      id: 1,
      title: 'Drama',
      slug: 'drama',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
      children: [
        {
          id: 2,
          title: 'Japan',
          slug: 'japan',
          image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
          type: 'tv',
        },
        {
          id: 3,
          title: 'comedy',
          slug: 'comedy',
          image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
          type: 'tv',
        },
      ],
    },
    {
      id: 4,
      title: 'Adventure',
      slug: 'adventure',
      type: 'serial',
      image: '',
      children: [],
    },
  ]);
};

export default loadCategories;
