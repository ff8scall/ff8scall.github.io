import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, image, schema }) => {
    const location = useLocation();
    const siteTitle = '유틸리티 허브';
    const siteUrl = 'https://ff8scall.github.io';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = '편리한 웹 도구 모음: 사주팔자, MBTI, 로또, 길이 변환, 무게 변환, 대출 계산, 날짜 계산, 글자수 세기, 환율 변환 등 39가지 무료 도구.';
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords ? `${keywords}, 유틸리티, 도구, 계산기, 변환기` : '유틸리티, 도구, 계산기, 변환기, 웹 툴';

    // Default OG image (you can create a nice banner image later)
    const defaultImage = `${siteUrl}/og-image.png`;
    const ogImage = image || defaultImage;

    // Current page URL
    const currentUrl = `${siteUrl}${location.pathname}${location.hash}`;

    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteTitle,
        "url": siteUrl,
        "description": metaDescription,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/#/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    const schemaData = schema || defaultSchema;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="ko_KR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Korean" />
            <meta name="author" content="Utility Hub" />

            {/* Schema.org JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
