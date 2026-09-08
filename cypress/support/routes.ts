import { WebsiteHome, type Route } from "@/constants/routes";

// Recurses through every nesting level of the route map, unlike naively
// reading only Object.keys(WebsiteHome.subRoutes) which stops at the top
// level and silently skips routes like /projects/personal.
const collect = (routes: Record<string, Route> | undefined): string[] =>
    Object.values(routes ?? {}).flatMap((route) => [
        route.path,
        ...collect(route.subRoutes),
    ]);

export const ALL_ROUTE_PATHS: string[] = [
    WebsiteHome.path,
    ...collect(WebsiteHome.subRoutes),
];
if (ALL_ROUTE_PATHS.length <= 1) {
    throw new Error(
        "No sub-routes collected - route sweeps would pass vacuously",
    );
}

// Every content page, excluding home: home carries different metadata
// (no CollectionPage JSON-LD) and is handled separately by callers.
export const CONTENT_ROUTE_PATHS: string[] = ALL_ROUTE_PATHS.filter(
    (path) => path !== WebsiteHome.path,
);

// One page per nesting depth (top-level, one level deep, two levels deep),
// for invariants that should hold identically everywhere without sweeping
// every route.
export const REPRESENTATIVE_ROUTE_PATHS: string[] = [
    WebsiteHome.path,
    WebsiteHome.subRoutes["/experience"].path,
    WebsiteHome.subRoutes["/projects"].subRoutes!["/projects/personal"].path,
];

// Individual blog articles are not part of the route tree above - only
// their category/group pages are (see constants/routes.ts). Article paths
// are otherwise discovered at test time via the discoverBlogArticles /
// discoverBlogArticleSubGroups tasks; these two are pinned deliberately.

// A generic representative article, for tests that only assert
// metadata/structure and don't care which article they're on.
export const SAMPLE_BLOG_ARTICLE_PATH =
    "/blog-articles/engineering/becoming-a-better-software-engineering-team-leader";

// The article with fenced code blocks - required by tests that exercise
// code-block rendering (theme recolouring, clipboard copy) and its in-body
// images; a substituted article without code blocks would break these.
export const CODE_BLOCK_BLOG_ARTICLE_PATH =
    "/blog-articles/cellery/reusing-your-micro-services-using-cellery";
