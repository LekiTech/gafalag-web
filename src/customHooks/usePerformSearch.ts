// import React from "react";
// import * as DOMURL from "jsurl";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchParams } from "../store/dictionary/dictionary.enum";
import RoutesPaths from "../RoutesPaths";


export function usePerformSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useSearchParams();
  return (expression: string) => {
    const setExpressionSearchQuery = (expression: string) => setSearchQuery(new URLSearchParams({[SearchParams.expression]: expression}));
    console.log('performSearch', expression)
    if (expression == undefined || expression.length === 0) {
      return;
    }
    if (location.pathname === RoutesPaths.Search) {
      setExpressionSearchQuery(expression);
    } else {
      navigate({
        pathname: RoutesPaths.Search, 
        search: `?${createSearchParams({expression})}`,
      });
    }
  }
}