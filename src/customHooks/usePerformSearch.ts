// import React from "react";
// import * as DOMURL from "jsurl";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchParams } from "../store/dictionary/dictionary.enum";
import RoutesPaths from "../RoutesPaths";


export function usePerformSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useSearchParams();
  return (expression: string, fromLang: string, toLang: string) => {
    console.log('performSearch', expression, fromLang, toLang)
    if (expression == undefined || expression.length === 0 ||
      fromLang == undefined || fromLang.length === 0 ||
      toLang == undefined || toLang.length === 0) {
      return;
    }
    const searchParams = {
      [SearchParams.expression]: expression,
      [SearchParams.fromLang]: fromLang,
      [SearchParams.toLang]: toLang
    };
    if (location.pathname === RoutesPaths.Search) {
      setSearchQuery(new URLSearchParams(searchParams));
    } else {
      navigate({
        pathname: RoutesPaths.Search, 
        search: `?${createSearchParams(searchParams)}`,
      });
    }
  }
}