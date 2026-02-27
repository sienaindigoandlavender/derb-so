import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/sheets/', '/api/google-index/', '/api/footer/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/api/questions/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: 'https://derb.so/sitemap.xml',
    host: 'https://derb.so',
  };
}
