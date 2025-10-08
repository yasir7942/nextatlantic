// data/contact-us.js
import { cache } from 'react';
import { getContactUsPage, getHomePage, getProductCategoryFeature, getProductCategoryLeftMenu } from './loader';





async function GetContactUsPage() {
    const res = await getContactUsPage()
    return res;
}
export const cachedGetContactUsPage = cache(GetContactUsPage);




async function GetProductCategoryLeftMenu() {
    const res = await getProductCategoryLeftMenu()
    return res;
}
export const cachedGetProductCategoryLeftMenu = cache(GetProductCategoryLeftMenu);



async function GetGetHomePage() {
    const res = await getHomePage()
    return res;
}
export const cachedGetGetHomePage = cache(GetGetHomePage);




async function GetProductCategoryFeature() {
    const res = await getProductCategoryFeature()
    return res;
}
export const cachedGetProductCategoryFeature = cache(GetProductCategoryFeature);
