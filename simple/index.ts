import * as lambdaapi from "@pulumi/lambdaapi";

const page = new lambdaapi.StaticPage("page", {
    indexContent: "<html><body><p>Hello world!</p></body></html>",
});

export const bucket = page.bucket;
export const url = page.websiteUrl;
