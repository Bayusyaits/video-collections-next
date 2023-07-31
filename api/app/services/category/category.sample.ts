import Category from './category.type';
import { plainToClass } from 'class-transformer';

const loadCategories = (): Category[] => {
  return plainToClass(Category, [
    {
      id: 1,
      title: 'Anime',
      slug: 'anime',
      icon: 'FruitsVegetable'
    },
    {
      id: 2,
      title: 'Live Action',
      slug: 'live-action',
      icon: 'FruitsVegetable'
    },
  ]);
};

export default loadCategories;
