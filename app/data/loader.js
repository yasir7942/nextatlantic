import { flattenAttributes } from "@/libs/data-utils";
import qs from 'qs';

let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let appMode = process.env.NEXT_PUBLIC_MODE;
let cacheSystem = "";
if (appMode == "dev") {
  cacheSystem = "no-cache";
}


export async function fetchData(path, filter) {

  const authToken = null;
  const header =
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Strapi-Response-Format": "v4",
      Authorization: `Bearer ${authToken}`,
    },
    cache: cacheSystem,

  }


  const url = new URL(path, baseUrl);
  url.search = filter;

  // show API links
  //console.log(url.href);

  try {

    const response = await fetch(url.href, authToken ? header : {});
    const data = await response.json();

    const flattenedData = flattenAttributes(data);


    // console.log(flattenedData)

    return flattenedData;
  } catch (error) {
    console.log(error);
  }
}


export async function getHomePage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema'],

  });


  let homePage = await fetchData("home-page", blogBlockQuery);

  return homePage
}

export async function getPostPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema'],

  });


  let blogPage = await fetchData("blog-page", blogBlockQuery);

  return blogPage
}

export async function getSearchPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema'],

  });


  let searchPage = await fetchData("search-page", blogBlockQuery);

  return searchPage
}

export async function getPostLimitedData() {

  const blogBlockQuery = qs.stringify({
    sort: 'PostDate:desc',
    pagination: {
      page: 1,
      pageSize: 3
    },
    populate: ['seo', 'featureImage', 'seo.schema'],
  });

  return await fetchData("posts", blogBlockQuery);

}


export async function geProductCategoryLeftMenu() {
  const pageSize = 100;
  let page = 1;
  let allCategories = [];
  let hasMore = true;

  while (hasMore) {
    const query = qs.stringify({
      sort: ['index'],
      populate: ['products', 'seo.schema', 'image', 'bImage'],
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await fetchData('product-categories', query);

    if (!response?.data?.length) break;

    allCategories.push(...response.data);

    const totalPages = response.meta?.pagination?.pageCount || 1;
    hasMore = page < totalPages;
    page++;
  }

  return allCategories;
}


export async function getProductCategoryLeftMenu() {

  const blogBlockQuery = qs.stringify({
    // publicationState: "preview", // This includes draft entries
    filters: {

      parent: {
        $null: true, // This checks that 'parent' is null
      },
    },
    sort: ['index'],
    populate: ['products', 'seo.schema', 'child', 'child.products'],
    pagination: {
      pageSize: 100,
      page: 1,
    },

  });
  return await fetchData("product-categories", blogBlockQuery);
}


export async function geProductsByCategory(category, currentPage, pageSize) {

  const PAGE_SIZE = pageSize;

  const blogBlockQuery = qs.stringify({

    filters: {
      product_categories: {
        slug: {
          $eq: category,
        },
      },
    },
    populate: ['productImage', 'product_categories', 'product_categories.banner.webBanner', 'product_categories.banner.mobileBanner', 'seo.schema'],


    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },

  });


  return await fetchData("products", blogBlockQuery);

}

export async function geGridCategoybyProduct() {

  const blogBlockQuery = qs.stringify({
    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema'],
  });


  return await fetchData("grid-category-page", blogBlockQuery);

}


export async function geSingleProduct(slug) {

  const blogBlockQuery = qs.stringify({
    filters: {

      slug: {
        $eq: slug, // Replace 'atlantic-synthetic-10w-40-api-sp' with the actual slug variable
      },

    },
    populate: ['productImage', 'seo', 'seo.schema', 'productSchema', 'productSchema.reviews',
      'related_products.productImage', 'product_categories', 'product_categories.banner.webBanner',
      'product_categories.banner.mobileBanner', 'product_categories.parent', 'TDSFile.url', 'MSDSFile.url'],
  });


  return await fetchData("products", blogBlockQuery);

}


export async function geProductsByGroup(productSlug, groupSlug) {

  const blogBlockQuery = qs.stringify({

    filters: {
      product_group: {
        slug: {
          $eq: groupSlug,
        },
      },
      $and: [
        {
          slug: {
            $ne: productSlug,
          },
        },
      ],


    },
    populate: ['productImage', 'seo.schema'],



    pagination: {
      pageSize: 20,
      page: 1,
    },

  });


  // 
  return await fetchData("products", blogBlockQuery);

}


export async function geProductsBySearch(query) {


  const searchProductQuery = qs.stringify({
    filters: {
      $or: [
        { title: { $containsi: query } },
        { name: { $containsi: query } },
        { api: { $containsi: query } },
        { acea: { $containsi: query } },
        { product_categories: { title: { $containsi: query } } }
      ],
    },
    populate: ['productImage', 'product_categories', 'seo.schema'],
    pagination: {
      pageSize: 10,
      page: 1,
    },
  });

  return await fetchData("products", searchProductQuery);
}


export async function geProductsBySearchAdvance(query) {


  const searchProductQuery = qs.stringify({
    filters: {
      $or: [
        { title: { $containsi: query } }, // product_categories
        { name: { $containsi: query } },
        { api: { $containsi: query } },
        { acea: { $containsi: query } },
        { product_categories: { title: { $containsi: query } } }
      ],
    },
    populate: ['productImage', 'product_categories', 'seo.schema'],
    pagination: {
      pageSize: 18,
      page: 1,
    },
  });

  return await fetchData("products", searchProductQuery);
}

export async function getBlogPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema'],

  });


  let blogPage = await fetchData("blog-page", blogBlockQuery);

  return blogPage
}

export async function gePosts(currentPage, pageSize) {

  const PAGE_SIZE = pageSize;
  const blogBlockQuery = qs.stringify({

    sort: 'PostDate:desc',
    filters: {},
    populate: ['featureImage', 'seo.schema'],


    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },

  });


  return await fetchData("posts", blogBlockQuery);

}


export async function geSinglePost(slug) {

  const blogBlockQuery = qs.stringify({
    filters: {

      slug: {
        $eq: slug,
      },

    },
    populate: ['featureImage', 'seo', 'seo.schema', 'post_categories'],
  });


  return await fetchData("posts", blogBlockQuery);

}



export async function getAboutPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'aboutus.image', 'founder.image', 'overValues', 'ourMission.image', 'overVisson.image', 'ourMission.image', 'overVisson.image', 'seo.schema'],

  });


  let aboutPage = await fetchData("about-us", blogBlockQuery);

  return aboutPage
}


export async function getContactUsPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo', 'seo.schema'],

  });


  let contactPage = await fetchData("contact-us", blogBlockQuery);

  return contactPage

}


export async function geAllProductsSlug() {
  let allProducts = [];
  let page = 1;
  let pageSize = 100;

  while (true) {
    const query = qs.stringify({
      fields: ["slug", "updatedAt"],
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await fetchData("products", query);

    const products = response?.data || [];
    const pagination = response?.meta?.pagination;

    allProducts.push(...products);

    if (pagination.page >= pagination.pageCount) {
      break;
    }

    page++;
  }

  return allProducts;
}



export async function getRedirectLinks() {

  let allRecords = [];
  let page = 1;
  const pageSize = 25;
  let hasMore = true;

  while (hasMore) {
    const blogBlockQuery = qs.stringify({
      filters: {},
      populate: [],
      pagination: {
        pageSize,
        page,
      },
    });

    const response = await fetchData("redirection-urls", blogBlockQuery);

    // Log response for debugging (remove when confirmed working)
    //console.log(`Page ${page} response:`, response);

    const records = response.data || [];
    allRecords = allRecords.concat(records);

    // Option 1: Using API metadata (if available)
    if (response.meta && response.meta.pagination) {
      const { pageCount, page: currentPage } = response.meta.pagination;
      hasMore = currentPage < pageCount;
    } else {
      // Option 2: Fallback - if the returned records count is less than the pageSize,
      // assume it's the last page.
      hasMore = records.length === pageSize;
    }

    page++;
  }

  return allRecords;
}




export async function getAllPostSlugs() {
  const pageSize = 50;
  let page = 1;
  let allPosts = [];
  let hasMore = true;

  while (hasMore) {
    const query = qs.stringify({
      fields: ['slug', 'updatedAt'],
      pagination: {
        page,
        pageSize
      }
    });

    const response = await fetchData('posts', query);

    if (!response?.data?.length) break;

    allPosts.push(...response.data);

    const total = response.meta?.pagination?.total || 0;
    const pageCount = response.meta?.pagination?.pageCount || 1;

    hasMore = page < pageCount;
    page++;
  }

  return allPosts;
}



export async function geAllProductCategorySlug() {
  let allCategories = [];
  let page = 1;
  const pageSize = 50;

  while (true) {
    const query = qs.stringify({
      fields: ["slug"],
      pagination: {
        page,
        pageSize,
      },
    });

    const response = await fetchData("product-categories", query);

    const categories = response?.data || [];
    const pagination = response?.meta?.pagination;

    allCategories.push(...categories);

    if (pagination.page >= pagination.pageCount) {
      break;
    }

    page++;
  }

  return allCategories;
}


export async function getProductCategory(slug) {

  const blogBlockQuery = qs.stringify({
    filters: {

      slug: {
        $eq: slug,
      },
    },
    populate: ['banner', 'banner.webBanner', 'banner.mobileBanner', 'seo', 'seo.schema', 'faq', 'parent', 'child', 'child.image', 'child.bImage', 'child.banner', 'child.banner.webBanner', 'child.banner.mobileBanner'],

  });
  return await fetchData("product-categories", blogBlockQuery);
}


export async function getProductCategoryList() {

  const blogBlockQuery = qs.stringify({
    // publicationState: "preview", // This includes draft entries
    filters: {

    },

    populate: ['products', 'products.productImage', 'products.TDSFile', 'products.MSDSFile', 'child', 'child.products'],
    pagination: {
      pageSize: 100,
      page: 1,
    },

  });
  return await fetchData("product-categories", blogBlockQuery);
}


export async function getParentProductCategoryList() {

  const blogBlockQuery = qs.stringify({
    // publicationState: "preview", // This includes draft entries
    filters: {

      parent: {
        $null: true, // This checks that 'parent' is null
      },
    },
    sort: ['index'],
    populate: ['products', 'products.productImage', 'products.TDSFile', 'products.MSDSFile', 'child', 'child.products'],
    pagination: {
      pageSize: 100,
      page: 1,
    },

  });
  return await fetchData("product-categories", blogBlockQuery);
}


export async function getReportParentProductCategoryList() {

  const blogBlockQuery = qs.stringify({
    publicationState: "preview", // This includes draft entries
    filters: {

      parent: {
        $null: true, // This checks that 'parent' is null
      },
    },
    sort: ['index'],
    populate: ['products', 'products.productImage', 'products.TDSFile', 'products.MSDSFile', 'child', 'child.products'],
    pagination: {
      pageSize: 100,
      page: 1,
    },

  });




  return await fetchData("product-categories", blogBlockQuery);
}

export async function getChildProductCategory(slug) {

  const blogBlockQuery = qs.stringify({

    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: ['products', 'products.productImage', 'products.TDSFile', 'products.MSDSFile'],
  });
  return await fetchData("product-categories", blogBlockQuery);
}


export async function getUncategorizedProducts() {

  const BlockQuery = qs.stringify({

    filters: {
      product_categories: {
        $null: true,
      },
    },
    populate: ['productImage', 'TDSFile', 'MSDSFile'],
  });
  return await fetchData("products", BlockQuery);
}



export async function getProductCategoryForHome() {
  const blogBlockQuery = qs.stringify({
    fields: ['title', 'slug'],
    filters: {
      featured: {
        $eq: true,
      },
      parent: {
        $null: true, // This checks that 'parent' is null
      },
    },
    populate: ['icon'],
    sort: ['index'],
  });

  return await fetchData("product-categories", blogBlockQuery);
}



export async function gePostBySearch(query) {

  const searchPostQuery = qs.stringify({
    filters: {
      $or: [
        { title: { $containsi: query } },
        { post_categories: { title: { $containsi: query } } },
        { seo: { seoDesctiption: { $containsi: query } } }
      ],
    },
    sort: 'PostDate:desc',

    populate: ['seo', 'featureImage', 'post_categories', 'seo.schema'],
    pagination: {
      pageSize: 10,
      page: 1,
    },
  });

  return await fetchData("posts", searchPostQuery);
}


export async function getCertifcateCategories() {

  const certificateBlockQuery = qs.stringify({

    populate: ['logo', 'certificates', 'certificates.certificateImages', 'certificates.certificatePdf', 'seo.schema'],
    pagination: {
      pageSize: 1000,
      page: 1,
    },

  });
  return await fetchData("certificate-categories  ", certificateBlockQuery);

}



export async function getCertificateApprovalPage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo', 'seo.schema'],

  });


  let approvalPage = await fetchData("certificate-and-approval", blogBlockQuery);

  return approvalPage
}


export async function geAllRedirectionUrl() {

  const UrllockQuery = qs.stringify({

    fields: ['soruce', 'destination']

  });
  return await fetchData("redirection-url", UrllockQuery);

}