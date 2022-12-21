import { buildURL } from "react-imgix";

export default function nextImageLoader({ src, width, quality }) {
    const imgixParams = {
        q: quality,
        w: width,
    };
    const imgixSrc =
        "https://nadundesilva.imgix.net" +
        (src.startsWith("/") ? "" : "/") +
        src;
    return buildURL(imgixSrc, imgixParams);
}
