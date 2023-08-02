import Collection from './collection.type';
import { plainToClass } from 'class-transformer';

const loadCategories = (): Collection[] => {
  return plainToClass(Collection, [
    {
      id: '1',
      title: 'Drama',
      slug: 'drama',
      type: 'tv',
      isActive: true,
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
    },
    {
      id: '2',
      title: 'Action',
      slug: 'action',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
      type: 'tv',
      isActive: true 
    },
    {
      id: '3',
      title: 'Comedy',
      slug: 'comedy',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
      type: 'tv',
      isActive: true 
    },
    {
      id: '4',
      title: 'Adventure',
      slug: 'adventure',
      type: 'serial',
      image: '',
      isActive: true
    },
  ]);
};

export default loadCategories;
