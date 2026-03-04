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
        allow: ['/', '/api/questions/', '/api/knowledge/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/api/questions/', '/api/knowledge/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: ['/', '/api/questions/', '/api/knowledge/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/', '/api/questions/', '/api/knowledge/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/api/questions/', '/api/knowledge/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/api/questions/', '/api/knowledge/'],
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
