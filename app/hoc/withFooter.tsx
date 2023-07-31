/* eslint-disable react/display-name */
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import produce, { Immutable } from "immer";

import FooterDynamic from "base-components/footer-dynamic";

export type FooterDynamicState = {
  isShow: boolean;
  component: React.ComponentType;
  onSubmit?: () => void;
  onClose?: () => void;
};

type OpenFooterArgs = FooterDynamicState;

type FooterDynamicAction = {
  type: "OPEN_FOOTER" | "CLOSE_FOOTER";
  payload?: Partial<FooterDynamicState>;
};

export type FooterDynamicDispatch = {
  openFooter: (args: OpenFooterArgs) => void;
  closeFooter: () => void;
  onSubmitFooter: () => void;
};

export type FooterDynamicContext = {
  state: Immutable<FooterDynamicState>;
  dispatch: FooterDynamicDispatch;
};

interface UseFooter
  extends Pick<FooterDynamicState, "isShow">,
    Omit<FooterDynamicDispatch, "onSubmitFooter"> {}

// Initial state modal popup
const initialState: FooterDynamicState = {
  isShow: false,
  component: () => <></>,
  onSubmit: () => {
    /* */
  },
  onClose: () => {
    /* */
  },
};

// Create context for state & dispatch modal popup
export const FooterDynamicStateContext: React.Context<
  Immutable<FooterDynamicState>
> = createContext(initialState as Immutable<FooterDynamicState>);

export const FooterDynamicDispatchContext =
  createContext<FooterDynamicDispatch>({
    openFooter: () => {
      /* */
    },
    closeFooter: () => {
      /* */
    },
    onSubmitFooter: () => {
      /* */
    },
  });

// Reducer for manage state modal popup
const reducer = produce(
  (draft: FooterDynamicState, action: FooterDynamicAction) => {
    const { type, payload = {} } = action;
    /* eslint-disable no-param-reassign */
    switch (type) {
      case "OPEN_FOOTER":
        Object.keys(draft).forEach((objKey) => {
          const key = objKey as keyof FooterDynamicState;
          (draft[key] as unknown) = payload[key] || initialState[key];
        });
        draft.isShow = true;
        return;
      case "CLOSE_FOOTER":
        draft.isShow = false;
        return;
      default:
        throw new Error("Unknown action type");
    }
    /* eslint-enable no-param-reassign */
  }
);

// Custom hooks method modal popup
function useFooterDynamic(): FooterDynamicContext {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { onClose, onSubmit, ...headerProps } = state;

  const openFooter = useCallback((args: OpenFooterArgs) => {
    dispatch({
      type: "OPEN_FOOTER",
      payload: { ...args },
    });
  }, []);

  const closeFooter = useCallback(() => {
    if (typeof onClose === "function") onClose();
    dispatch({
      type: "CLOSE_FOOTER",
    });
  }, [onClose]);

  const onSubmitFooter = useCallback(() => {
    if (typeof onSubmit === "function") onSubmit();
    closeFooter();
  }, [closeFooter, onSubmit]);

  return useMemo(
    () => ({
      state: headerProps,
      dispatch: {
        openFooter,
        closeFooter,
        onSubmitFooter,
      },
    }),
    [headerProps, openFooter, closeFooter, onSubmitFooter]
  );
}

export function useFooter(): UseFooter {
  const { isShow } = useContext(FooterDynamicStateContext);
  const { onSubmitFooter, ...dispatch } = useContext(
    FooterDynamicDispatchContext
  );
  return { isShow, ...dispatch };
}

// HOC to wrap context modal popup
const withFooter =
  <P extends Record<string, unknown> = Record<string, unknown>>(
    Component: React.ComponentType<P>
  ) =>
  (props: P) => {
    const { state, dispatch } = useFooterDynamic();
    return (
      <FooterDynamicDispatchContext.Provider value={dispatch}>
        <FooterDynamicStateContext.Provider value={state}>
          <FooterDynamic />
          <Component {...props} />
        </FooterDynamicStateContext.Provider>
      </FooterDynamicDispatchContext.Provider>
    );
  };

export default withFooter;
