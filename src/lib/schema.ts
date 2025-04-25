type SchemaOrgWebPage = {
  url: string;
  title: string;
  description?: string;
  images?: string[];
};

type SchemaOrgArticle = {
  url: string;
  title: string;
  description?: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  images?: string[];
  section?: string;
};

type SchemaOrgBreadcrumb = {
  items: {
    name: string;
    item: string;
  }[];
};

export const generateWebPageSchema = (data: SchemaOrgWebPage) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url,
    image: data.images?.[0],
  };
};

export const generateArticleSchema = (data: SchemaOrgArticle) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: data.url,
    image: data.images,
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime || data.publishedTime,
    author: {
      '@type': 'Person',
      name: data.authorName,
    },
    articleSection: data.section,
  };
};

export const generateBreadcrumbSchema = (data: SchemaOrgBreadcrumb) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
};

export const toJsonLd = (data: any) => {
  return JSON.stringify(data, null, 2);
}; 