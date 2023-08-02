import Video from './video.type';
import { plainToClass } from 'class-transformer';

export function createVideoSamples() {
  return plainToClass(Video, [
    {
      id: 1,
      title: 'One Piece',
      slug: 'one-piece',
      episode: 2,
      publishDate: '01-02-2011',
      isCencor: true,
      rates: 5,
      rank: 1,
      collections: ['drama'],
      description:
        'A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains distinguishing them from dessert bananas.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },

    {
      id: 2,
      title: 'Naruto',
      slug: 'naruto',
      episode: 1,
      isCencor: false,
      rates: 5,
      rank: 2,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 3,
      title: 'Shincan',
      slug: 'shincan',
      episode: 1,
      isCencor: true,
      rates: 3,
      rank: 4,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 4,
      title: 'Nube',
      slug: 'nube',
      episode: 1,
      isCencor: true,
      rates: 5,
      rank: 4,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 5,
      title: 'Inuyasha',
      slug: 'inuyasha',
      episode: 1,
      isCencor: false,
      rates: 5,
      rank: 5,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 6,
      title: 'Tamiya',
      slug: 'tamiya',
      episode: 1,
      isCencor: false,
      rates: 4,
      rank: 6,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 7,
      title: 'Conan',
      slug: 'conan',
      episode: 1,
      isCencor: false,
      rates: 4,
      rank: 7,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 8,
      title: 'Doraemon',
      slug: 'doraemon',
      episode: 1,
      isCencor: false,
      rates: 4,
      rank: 8,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 9,
      title: 'Tayo',
      slug: 'tayo',
      episode: 1,
      isCencor: false,
      rates: 3,
      rank: 9,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
    {
      id: 10,
      title: 'Hamtaro',
      slug: 'hamtaro',
      episode: 1,
      isCencor: false,
      rates: 3,
      rank: 10,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    }, 
    {
      id: 11,
      title: 'Dragon Ball',
      slug: 'dragon-ball',
      episode: 1,
      isCencor: false,
      rates: 3,
      rank: 11,
      collections: [],
      publishDate: '01-03-2011',
      description:
        'The onion, also known as the bulb onion or common onion, is a vegetable that is the most widely cultivated species of the genus Allium. Its close relatives include the garlic, shallot, leek, chive, and Chinese onion.',
      type: 'tv',
      image: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions_thumb.png',
      gallery: [
        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },

        {
          url: 'http://s3.amazonaws.com/redqteam.com/pickbazar/onions.jpg',
        },
      ],
      categories: [
        {
          id: 1,
          title: 'Anime',
          slug: 'anime',
        },
      ],
    },
  ]);
}
