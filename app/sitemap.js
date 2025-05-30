

import { geAllProductsSlug, geProductCategoryLeftMenu, getAllPostSlugs } from "./data/loader";

export default async function sitemap() {

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


  //product category
  const productCatgory = await geProductCategoryLeftMenu();

  const productCatgoryMap = productCatgory?.map((category) => {
    return {
      url: `${baseURL}/product-category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      priority: 0.9,
      changeFrequency: 'weekly',
    };

  })

  //products
  const products = await geAllProductsSlug();
  const productsMap = products?.map((product) => {
    return {
      url: `${baseURL}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      priority: 0.7,
      changeFrequency: 'weekly',
    };
  })


  //blog posts
  const blogs = await getAllPostSlugs();

  const blogsMap = blogs?.map((post) => {
    return {
      url: `${baseURL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      priority: 0.5,
      changeFrequency: 'weekly',
    };
  })



  const dynamicLinks = (productCatgoryMap?.concat(productsMap ?? [])).concat(blogsMap ?? []).flat() ?? [];

  return [

    {
      url: `${baseURL}`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseURL}/about-us`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseURL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    {
      url: `${baseURL}/contact`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/certificates`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/privacy-policy`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/interested-parties`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/ims-policy`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/hse`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...dynamicLinks,

  ]





}