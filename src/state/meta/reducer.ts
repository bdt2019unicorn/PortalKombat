import { AnyAction } from 'redux';
import { appendUIDToActionNamePrefix } from 'state/cacheableRoutines';

export type MetaReducer = {
  [action: string]: {
    isLoading: boolean;
    hasLoaded: boolean;
  };
};

const metaReducer = (
  state: MetaReducer,
  action: AnyAction & {
    meta?: {
      isCacheableRoutine: boolean;
    };
  },
) => {
  const { type: actionName, meta } = action;

  if (!actionName || !meta?.isCacheableRoutine) {
    return {
      ...state,
    };
  }

  const actionNameWithUID = appendUIDToActionNamePrefix(action);

  if (actionName.endsWith('/INVALIDATE')) {
    return {
      ...state,
      [actionNameWithUID]: null,
    };
  }

  if (actionName.endsWith('/TRIGGER')) {
    return {
      ...state,
      [actionNameWithUID]: {
        isLoading: true,
        hasLoaded: false,
      },
    };
  }

  if (actionName.endsWith('/FULFILL')) {
    return {
      ...state,
      [actionNameWithUID]: {
        isLoading: false,
        hasLoaded: true,
      },
    };
  }

  return {
    ...state,
  };
};

export default metaReducer;
