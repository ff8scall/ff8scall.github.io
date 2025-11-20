import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const siteTitle = '유틸리티 허브';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = '편리한 웹 도구 모음: 길이 변환, 무게 변환, 대출 계산, 날짜 계산, 글자수 세기, 환율 변환, 유니코드 변환.';
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords ? `${keywords}, 유틸리티, 도구, 계산기, 변환기` : '유틸리티, 도구, 계산기, 변환기, 웹 툴';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
        </Helmet>
    );
};

export default SEO;
