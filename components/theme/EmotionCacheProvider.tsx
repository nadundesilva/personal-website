"use client";
/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import createCache, { type EmotionCache } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import * as React from "react";

export interface EmotionCacheProviderProps {
    CacheProvider?: (props: {
        value: EmotionCache;
        children: React.ReactNode;
    }) => React.JSX.Element | null;
    children: React.ReactNode;
}

export default function EmotionCacheProvider(
    props: EmotionCacheProviderProps,
): React.ReactElement {
    const { CacheProvider = DefaultCacheProvider, children } = props;

    const [registry] = React.useState(() => {
        const cache = createCache({ key: "css" });
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: Array<{ name: string; isGlobal: boolean }> = [];
        cache.insert = (...args) => {
            const [selector, serialized] = args;
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push({
                    name: serialized.name,
                    isGlobal: selector === undefined,
                });
            }
            return prevInsert(...args);
        };
        const flush = (): Array<{ name: string; isGlobal: boolean }> => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const inserted = registry.flush();
        if (inserted.length === 0) {
            return null;
        }
        let styles = "";
        let dataEmotionAttribute = registry.cache.key;

        const globals: Array<{
            name: string;
            style: string;
        }> = [];

        inserted.forEach(({ name, isGlobal }) => {
            const style = registry.cache.inserted[name];

            if (typeof style !== "boolean") {
                if (isGlobal) {
                    globals.push({ name, style });
                } else {
                    styles += style;
                    dataEmotionAttribute += ` ${name}`;
                }
            }
        });

        return (
            <React.Fragment>
                {globals.map(({ name, style }) => (
                    <style
                        key={name}
                        data-emotion={`${registry.cache.key}-global ${name}`}
                        dangerouslySetInnerHTML={{ __html: style }}
                    />
                ))}
                {styles !== undefined && (
                    <style
                        data-emotion={dataEmotionAttribute}
                        dangerouslySetInnerHTML={{ __html: styles }}
                    />
                )}
            </React.Fragment>
        );
    });

    return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
