
import { flattenAttributes } from "@/libs/data-utils";
import qs from "qs";

let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let appMode = process.env.NEXT_PUBLIC_MODE;


function formatError(err) {
  const cause = err?.cause ?? {};
  return {
    name: err?.name,
    message: err?.message,
    stack: err?.stack,
    cause: {
      code: cause?.code,
      errno: cause?.errno,
      syscall: cause?.syscall,
      address: cause?.address,
      port: cause?.port,
      message: cause?.message,
      stack: cause?.stack,
    },
  };
}

/*
let cacheSystem = "";
if (appMode == "dev") {
  cacheSystem = "no-cache";
}
*/

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
    // cache: cacheSystem,

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



/*
export async function fetchData(path, filter, init = {}) {
  const authToken = null;

  const headers = {
    "Content-Type": "application/json",
    "Strapi-Response-Format": "v4",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };

  if (!baseUrl) {
    console.error("[fetchData] NEXT_PUBLIC_API_BASE_URL is missing.", { path });
    return { data: [] };
  }

  const url = new URL(path, baseUrl);
  if (filter) url.search = filter;

  // Build final init (your defaults + caller overrides)
  const reqInit = {
    method: "GET",
    headers,
    // cache: cacheSystem,        // stays as you had it
    ...init,                   // allows ISR: { next: { revalidate: N } }
  };

  // Timeout to avoid hanging during build
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 12_000);
  try {
    const res = await fetch(url.href, { ...reqInit, signal: ac.signal });
    clearTimeout(timer);

    if (!res.ok) {
      let bodySnippet = "";
      try { bodySnippet = (await res.text()).slice(0, 600); } catch { }
      console.error("[fetchData] Non-OK response", {
        url: url.href,
        status: res.status,
        statusText: res.statusText,
        // cache: cacheSystem,
        appMode,
        bodySnippet,
      });
      return { data: [] }; // fail-soft so SSG doesn't crash
    }

    let json;
    try {
      json = await res.json();
    } catch (e) {
      console.error("[fetchData] JSON parse failed", { url: url.href, e: formatError(e) });
      return { data: [] };
    }

    const flattened = flattenAttributes(json);
    return flattened ?? { data: [] };
  } catch (error) {
    clearTimeout(timer);
    const details = formatError(error);

    // Improve hinting for dynamic-server errors (not network)
    const isDynamicUsage =
      typeof error?.message === "string" &&
      error.message.startsWith("Dynamic server usage:");

    const hint = isDynamicUsage
      ? "This route is static but a fetch used revalidate:0/no-store (or dynamic flags)."
      : details?.cause?.code === "ECONNREFUSED"
        ? "API unreachable (is Strapi running?)"
        : details?.cause?.code === "ECONNRESET"
          ? "Server reset connection (restart/crash/transient)."
          : details?.name === "AbortError"
            ? "Request timed out."
            : "Network failure or server down.";

    console.error("[fetchData] Request failed", {
      url: url.href,
      //  cache: cacheSystem,
      appMode,
      error: details,
      hint,
    });
    return { data: [] };
  }
}
*/
/*

export async function fetchData(path, filter, init = {}) {
  const authToken = null;

  const headers = {
    "Content-Type": "application/json",
    "Strapi-Response-Format": "v4",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };

  if (!baseUrl) {
    console.error("[fetchData] NEXT_PUBLIC_API_BASE_URL is missing.", { path });
    return { data: [] };
  }

  const url = new URL(path, baseUrl);
  if (filter) url.search = filter;

  // You can set a longer timeout here (e.g., 30 seconds)
  const TIMEOUT_MS = 30_000;

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);

  // Start measuring time
  const start = Date.now();

  try {
    const res = await fetch(url.href, {
      method: "GET",
      headers,
      ...init,
      signal: ac.signal,
    });

    clearTimeout(timer);

    // Measure total duration
    const duration = Date.now() - start;

    // Log slow responses (>1000 ms = 15 s)
    if (duration > 15000) {
      console.warn(`Slow response: ${duration} ms`, { url: url.href });
    }

    if (!res.ok) {
      let bodySnippet = "";
      try { bodySnippet = (await res.text()).slice(0, 600); } catch { }
      console.error("[fetchData] Non-OK response", {
        url: url.href,
        status: res.status,
        statusText: res.statusText,
        appMode,
        bodySnippet,
      });
      return { data: [] };
    }

    let json;
    try {
      json = await res.json();
    } catch (e) {
      console.error("[fetchData] JSON parse failed", { url: url.href, e: formatError(e) });
      return { data: [] };
    }

    const flattened = flattenAttributes(json);
    return flattened ?? { data: [] };

  } catch (error) {
    clearTimeout(timer);
    const details = formatError(error);
    const isDynamicUsage =
      typeof error?.message === "string" &&
      error.message.startsWith("Dynamic server usage:");

    const hint = isDynamicUsage
      ? "This route is static but a fetch used revalidate:0/no-store (or dynamic flags)."
      : details?.cause?.code === "ECONNREFUSED"
        ? "API unreachable (is Strapi running?)"
        : details?.cause?.code === "ECONNRESET"
          ? "Server reset connection (restart/crash/transient)."
          : details?.name === "AbortError"
            ? `Request timed out after ${TIMEOUT_MS / 1000}s.`
            : "Network failure or server down.";

    console.error("[fetchData] Request failed", {
      url: url.href,
      appMode,
      error: details,
      hint,
    });

    return { data: [] };
  }
}
*/
/*---------------------------------------------------------------------------------------------------------------------------*/

export async function getHomePage() {

  const blogBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo.schema', 'bodyImage', 'imageText', 'imageText.image', 'imageText.TextImage', 'infoBlock', 'infoBlock.image'],

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
    populate: ['productImage', 'product_categories', 'product_categories.banner.webBanner', 'product_categories.banner.mobileBanner', 'seo', 'seo.schema'],


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
      'product_categories.banner.mobileBanner', 'product_categories.parent', 'TDSFile.url', 'MSDSFile.url', 'faq'],
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




function extractWVariants(text) {    //extract W Variants
  if (!text) return [];

  // allow optional spaces around W and hyphen; accept hyphen/en-dash/em-dash
  const re = /(\d+(?:\.\d+)?)\s*[wW]\s*[-–—]?\s*(\d+(?:\.\d+)?)/g;

  const out = new Set();

  for (const m of text.matchAll(re)) {
    const a = String(m[1]).toLowerCase(); // before W
    const b = String(m[2]).toLowerCase(); // after W

    out.add(`${a}w-${b}`);
    out.add(`${a}w ${b}`);
    out.add(`${a}w${b}`);
  }

  return Array.from(out);
}


// NEW: extracts "right-W" patterns like "SAE 40W", "40w", "40 W", "40-W"
function extractRightWVariants(text) {
  if (!text) return [];
  const s = String(text);

  const out = new Set();

  // SAE {num}W  →  numw / num w / num-w
  for (const m of s.matchAll(/\bsae\s*(\d+(?:\.\d+)?)\s*[wW]\b/g)) {
    const n = m[1];
    out.add(`${n}w`);
    out.add(`${n} w`);
    out.add(`${n}-w`);
  }

  // {num}{optional (space|dash)}W  →  numw / num w / num-w
  for (const m of s.matchAll(/\b(\d+(?:\.\d+)?)\s*[- ]?\s*[wW]\b/g)) {
    const n = m[1];
    out.add(`${n}w`);
    out.add(`${n} w`);
    out.add(`${n}-w`);
  }

  return Array.from(out);
}


// Finds PM/MP patterns like "PM3", "PM 3", "PM-3", "mp12", etc.
// Returns variants: "PM 3", "PM-3", "PM3" (uppercase prefix, original number)
function extractPMMPVariants(text) {
  if (!text) return [];
  const s = String(text);

  const out = new Set();

  // Match PM or MP (case-insensitive), optional space/hyphen, then number (allow decimals)
  const re = /\b(PM|MP)\s*[- ]?\s*(\d+(?:\.\d+)?)\b/gi;
  for (const m of s.matchAll(re)) {
    const prefix = m[1].toUpperCase();    // PM or MP
    const num = m[2];                     // e.g. "3", "12", "5.1"
    out.add(`${prefix} ${num}`);          // "PM 3"
    out.add(`${prefix}-${num}`);          // "PM-3"
    out.add(`${prefix}${num}`);           // "PM3"
  }

  return Array.from(out);
}

/**
 * Find HVI patterns like: "HVI 100", "HVI-100", "HVI100" anywhere,
 * and return variants: "HVI-100", "HVI100", "HVI 100"
 */
function extractHviVariants(text) {
  if (!text) return [];
  const s = String(text);

  const out = new Set();
  const re = /\bHVI\s*[- ]?\s*(\d+(?:\.\d+)?)\b/gi; // captures the number after HVI

  for (const m of s.matchAll(re)) {
    const n = m[1];              // number part, e.g. "100" or "7.5"
    out.add(`HVI-${n}`);
    out.add(`HVI${n}`);
    out.add(`HVI ${n}`);
  }
  return Array.from(out);
}

/**
 * Find AW patterns like: "AW 100", "AW-100", "AW100" anywhere,
 * and return variants: "AW-100", "AW100", "AW 100".
 */
function extractAwVariants(text) {
  if (!text) return [];
  const s = String(text);

  const out = new Set();
  // AW + optional spaces/hyphen + number (int or decimal)
  const re = /\bAW\s*[- ]?\s*(\d+(?:\.\d+)?)\b/gi;

  for (const m of s.matchAll(re)) {
    const n = m[1];        // "100", "7.5", etc.
    out.add(`AW-${n}`);
    out.add(`AW${n}`);
    out.add(`AW ${n}`);
  }
  return Array.from(out);
}


export async function geProductsBySearch(query) {
  const q = String(query ?? "").trim();

  console.log("Search query:", q);

  if (!q) {
    const empty = qs.stringify(
      { filters: { id: { $null: true } }, pagination: { pageSize: 10, page: 1 } },
      { encodeValuesOnly: true }
    );
    return await fetchData("products", empty);
  }

  // ---- collect variants ---------------------------------------------------
  const vW = extractWVariants(q);          // 10w-40 / 10w 40 / 10w40
  const vRightW = extractRightWVariants(q);     // 40w / 40 w / 40-w (+ SAE 40W)
  const vPMMP = extractPMMPVariants(q);       // PM/MP 3 → PM 3 / PM-3 / PM3
  const vHVI = extractHviVariants(q);        // HVI 100 → HVI-100 / HVI100 / HVI 100
  const vAW = extractAwVariants(q);         // AW 46 → AW-46 / AW46 / AW 46

  const allVariants = Array.from(
    new Set([...(vW || []), ...(vRightW || []), ...(vPMMP || []), ...(vHVI || []), ...(vAW || [])])
  ).slice(0, 50);

  console.log("Extracted variants:", allVariants);

  if (allVariants.length > 20) {
    console.warn("Too many variants extracted, limiting to 20 for performance.");
  }

  // ---- base OR across common fields (raw query) ---------------------------
  const baseOr = [
    { title: { $containsi: q } },
    { name: { $containsi: q } },
    { grade: { $containsi: q } },
    { api: { $containsi: q } },
    { acea: { $containsi: q } },
    { product_categories: { title: { $containsi: q } } },
  ];

  console.log("Base OR conditions:", baseOr);

  // ---- one OR per variant on grade ---------------------------------------
  const variantOr = allVariants.map(v => ({ grade: { $containsi: v } }));

  // ---- guards to tighten matching (reduce false positives) ----------------
  const guards = [];

  // HVI guard: require "HVI" and the number to both appear in grade
  const hviNum = q.match(/\bHVI\s*[- ]?\s*(\d+(?:\.\d+)?)\b/i)?.[1];
  if (hviNum) {
    guards.push({ $and: [{ grade: { $containsi: "HVI" } }, { grade: { $containsi: hviNum } }] });
  }

  // AW guard: require "AW" and the number
  const awNum = q.match(/\bAW\s*[- ]?\s*(\d+(?:\.\d+)?)\b/i)?.[1];
  if (awNum) {
    guards.push({ $and: [{ grade: { $containsi: "AW" } }, { grade: { $containsi: awNum } }] });
  }

  // Multi-grade guard: if user typed aW-b, ensure both parts exist in grade
  const mg = q.match(/\b(\d+(?:\.\d+)?)\s*[wW]\s*[- ]?\s*(\d+(?:\.\d+)?)\b/);
  if (mg) {
    const [, a, b] = mg;
    guards.push({ $and: [{ grade: { $containsi: `${a}W` } }, { grade: { $containsi: `${b}` } }] });
  }

  // ---- final query --------------------------------------------------------
  const searchProductQuery = qs.stringify(
    {
      filters: { $or: [...baseOr, ...variantOr, ...guards] },
      populate: ["productImage", "product_categories", "seo.schema"],
      pagination: { pageSize: 10, page: 1 },
    },
    { encodeValuesOnly: true }
  );

  console.log("Final search query:", searchProductQuery);

  const result = await fetchData("products", searchProductQuery);
  console.log("Search results count:", result);

  return result;
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
    populate: ['featureImage', 'seo', 'seo.schema', 'post_categories', 'faq'],
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

  const contactBlockQuery = qs.stringify({

    populate: ['banner.webBanner', 'banner.mobileBanner', 'seo', 'seo.schema'],

  });

  let contactPage = await fetchData("contact-us", contactBlockQuery);
  return contactPage

}

export async function getContactUsPageFooter() {

  const contactBlockQuery = qs.stringify({



  });

  let contactPage = await fetchData("contact-us", contactBlockQuery);
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
  const pageSize = 100;

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
    // populate: ['banner', 'banner.webBanner', 'banner.mobileBanner', 'seo', 'seo.schema', 'faq', 'parent', 'child', 'child.image', 'child.bImage', 'child.banner', 'child.banner.webBanner', 'child.banner.mobileBanner'],


    populate: {
      banner: { populate: ["webBanner", "mobileBanner"] },
      seo: { populate: ["schema"] },
      faq: true,
      parent: true,
      child: {
        // ✅ sort the children themselves
        sort: ["index:desc"],           // not "child.index:asc"
        fields: ["id", "title", "slug", "index"],
        populate: {
          image: true,
          bImage: true,
          banner: { populate: ["webBanner", "mobileBanner"] },
        },
      },
    }



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
    populate: ['products', 'image', 'bImage', 'banner', 'banner.webBanner', 'banner.mobileBanner', 'products.productImage', 'products.TDSFile', 'products.MSDSFile', 'child', 'child.image', 'child.bImage', 'child.banner', 'child.banner.webBanner', 'child.banner.mobileBanner'],
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



export async function getProductCategoryFeature() {
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


export async function getAllProductsWithDetails() {    // delete it later use for  data correction
  let allProducts = [];
  let page = 1;
  let pageSize = 100;

  while (true) {
    const query = qs.stringify({
      fields: ["id", "name", "description"],
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
