import { useEffect, useReducer, useCallback } from "react";

const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "SET_DATA",
  SET_PAGE: "SET_PAGE",
  SET_LIMIT: "SET_LIMIT",
  RESET: "RESET",
};

const initialState = {
  page: 1,
  skip: 0,
  limit: 10,
  data: [],
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_DATA:
      return {
        ...state,
        data: action.payload.products || [],
        total: action.payload.total || 0,
        totalPages: Math.ceil((action.payload.total || 0) / state.limit),
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.payload,
        skip: (action.payload - 1) * state.limit,
      };
    case ACTIONS.SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
        page: 1,
        skip: 0,
        totalPages: state.total
          ? Math.ceil(state.total / action.payload)
          : state.totalPages,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
}

const useFetch = (url, options = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    limit: options.initialLimit || initialState.limit,
  });

  const fetchProducts = useCallback(async () => {
    if (state.loading) return;

    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });
      const apiUrl = new URL(url);
      apiUrl.searchParams.append("limit", state.limit.toString());
      apiUrl.searchParams.append("skip", state.skip.toString());

      if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
          apiUrl.searchParams.append(key, value.toString());
        });
      }
      const fetchOptions = {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options.fetchOptions,
      };

      const response = await fetch(apiUrl.toString(), fetchOptions);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseJson = await response.json();
      dispatch({ type: ACTIONS.SET_DATA, payload: responseJson });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    } catch (err) {
      console.error("Error fetching data:", err);
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [url, state.limit, state.skip, options]);

  useEffect(() => {
    fetchProducts();
  }, [state.page, state.limit, url]);

  const goToPage = useCallback(
    (pageNumber) => {
      if (
        pageNumber < 1 ||
        (state.totalPages > 0 && pageNumber > state.totalPages)
      ) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: `Invalid page number: ${pageNumber}. Valid range is 1-${state.totalPages}`,
        });
        return;
      }

      dispatch({ type: ACTIONS.SET_PAGE, payload: pageNumber });
    },
    [state.totalPages]
  );

  const setLimit = useCallback((newLimit) => {
    if (newLimit < 1) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: `Invalid limit: ${newLimit}. Must be greater than 0.`,
      });
      return;
    }

    dispatch({ type: ACTIONS.SET_LIMIT, payload: newLimit });
  }, []);

  const refresh = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  const paginationInfo = {
    currentPage: state.page,
    totalPages: state.totalPages,
    totalItems: state.total,
    itemsPerPage: state.limit,
    hasNextPage: state.page < state.totalPages,
    hasPrevPage: state.page > 1,
  };

  return {
    ...state,
    paginationInfo,
    goToPage,
    setLimit,
    refresh,
    reset,
    nextPage: () => goToPage(state.page + 1),
    prevPage: () => goToPage(state.page - 1),
    firstPage: () => goToPage(1),
    lastPage: () => goToPage(state.totalPages || 1),
  };
};

export default useFetch;
