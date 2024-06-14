import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://xstresser.my.id',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }
  ];
}