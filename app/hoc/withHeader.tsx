/* eslint-disable react/display-name */
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import produce, { Immutable } from "immer";

import HeaderArrow from "base-components/header-arrow";
import HeaderArrowDefault from "base-components/header-arrow/default";

export type HeaderArrowState = {
  isArrow: boolean;
  className?: string;
  component: React.ComponentType;
  onSubmit?: () => void;
  onClose?: () => void;
};

type OpenHeaderArgs = Omit<HeaderArrowState, "isArrow">;

type HeaderArrowAction = {
  type: "OPEN_HEADER" | "CLOSE_HEADER";
  payload?: Partial<HeaderArrowState>;
};

export type HeaderArrowDispatch = {
  openHeader: (args: OpenHeaderArgs) => void;
  closeHeader: () => void;
  onSubmitHeader: () => void;
};

export type HeaderArrowContext = {
  state: Immutable<HeaderArrowState>;
  dispatch: HeaderArrowDispatch;
};

interface UseHeader
  extends Pick<HeaderArrowState, "isArrow">,
    Omit<HeaderArrowDispatch, "onSubmitHeader"> {}

// Initial state modal popup
const initialState: HeaderArrowState = {
  isArrow: true,
  className: '',
  component: () => <HeaderArrowDefault />,
  onSubmit: () => {
    /* */
  },
  onClose: () => {
    /* */
  },
};

// Create context for state & dispatch modal popup
export const HeaderArrowStateContext: React.Context<
  Immutable<HeaderArrowState>
> = createContext(initialState as Immutable<HeaderArrowState>);

export const HeaderArrowDispatchContext = createContext<HeaderArrowDispatch>({
  openHeader: () => {
    /* */
  },
  closeHeader: () => {
    /* */
  },
  onSubmitHeader: () => {
    /* */
  },
});

// Reducer for manage state modal popup
const reducer = produce(
  (draft: HeaderArrowState, action: HeaderArrowAction) => {
    const { type, payload = {} } = action;
    /* eslint-disable no-param-reassign */
    switch (type) {
      case "OPEN_HEADER":
        Object.keys(draft).forEach((objKey) => {
          const key = objKey as keyof HeaderArrowState;
          (draft[key] as unknown) = payload[key] || initialState[key];
        });
        draft.isArrow = true;
        return;
      case "CLOSE_HEADER":
        draft.isArrow = false;
        return;
      default:
        throw new Error("Unknown action type");
    }
    /* eslint-enable no-param-reassign */
  }
);

// Custom hooks method modal popup
function useHeaderArrow(): HeaderArrowContext {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { onClose, onSubmit, ...headerProps } = state;

  const openHeader = useCallback((args: OpenHeaderArgs) => {
    dispatch({
      type: "OPEN_HEADER",
      payload: { ...args },
    });
  }, []);

  const closeHeader = useCallback(() => {
    if (typeof onClose === "function") onClose();
    dispatch({
      type: "CLOSE_HEADER",
    });
  }, [onClose]);

  const onSubmitHeader = useCallback(() => {
    if (typeof onSubmit === "function") onSubmit();
    closeHeader();
  }, [closeHeader, onSubmit]);

  return useMemo(
    () => ({
      state: headerProps,
      dispatch: {
        openHeader,
        closeHeader,
        onSubmitHeader,
      },
    }),
    [headerProps, openHeader, closeHeader, onSubmitHeader]
  );
}

// Custom hooks for use in other components
export function useHeader(): UseHeader {
  const { isArrow } = useContext(HeaderArrowStateContext);
  const { onSubmitHeader, ...dispatch } = useContext(
    HeaderArrowDispatchContext
  );
  return { isArrow, ...dispatch };
}

// HOC to wrap context modal popup
const withHeader =
  <P extends Record<string, unknown> = Record<string, unknown>>(
    Component: React.ComponentType<P>
  ) =>
  (props: P) => {
    const { state, dispatch } = useHeaderArrow();
    return (
      <HeaderArrowDispatchContext.Provider value={dispatch}>
        <HeaderArrowStateContext.Provider value={state}>
          <HeaderArrow />
          <Component {...props} />
        </HeaderArrowStateContext.Provider>
      </HeaderArrowDispatchContext.Provider>
    );
  };

export default withHeader;
