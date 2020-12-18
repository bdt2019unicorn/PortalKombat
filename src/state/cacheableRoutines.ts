import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action, AnyAction } from 'redux';
import {
  Routine,
  // @ts-ignore // @redux-saga-routines does not have type declarations for the next two functions that we need ):
  createRoutineCreator,
  // @ts-ignore
  defaultRoutineStages,
  ResolveActionCreatorByPayload,
} from 'redux-saga-routines';

import { useTypedSelector } from 'state';
import { MetaReducer } from './meta/reducer';

type CacheableRoutine<
  TTriggerPayloadCreator,
  TRequestPayloadCreator,
  TSuccessPayloadCreator,
  TFailurePayloadCreator,
  TFulfillPayloadCreator
> = Routine<
  ResolveActionCreatorByPayload<TTriggerPayloadCreator>,
  ResolveActionCreatorByPayload<TRequestPayloadCreator>,
  ResolveActionCreatorByPayload<TSuccessPayloadCreator>,
  ResolveActionCreatorByPayload<TFailurePayloadCreator>,
  ResolveActionCreatorByPayload<TFulfillPayloadCreator>
> & {
  invalidate: ResolveActionCreatorByPayload<TTriggerPayloadCreator>;
};

export const appendUIDToActionNamePrefix = (action: AnyAction) => {
  const { type: actionName, payload } = action;

  const [actionNamePrefix] = actionName.split('/');

  // Uniquely identifying action-types via action.payload
  const actionNameWithUID = actionNamePrefix.concat(
    payload ? JSON.stringify(payload) : '',
  );

  return actionNameWithUID;
};

const useMetaLoadingState = (actions: Action[]) => {
  const [isLoading, setIsLoading] = useState(false);

  const { meta }: { meta: MetaReducer } = useTypedSelector((state) => state);

  const isActionLoading = (action: Action) => {
    const actionNameWithUID = appendUIDToActionNamePrefix(action);

    return meta[actionNameWithUID]?.isLoading;
  };

  const updateLoadingState = () => {
    const isLoading = actions.some(isActionLoading);

    setIsLoading(isLoading);
  };

  useEffect(updateLoadingState, [meta]);

  return isLoading;
};

export const useCacheableActions = (...actions: Action[]) => {
  const isLoading = useMetaLoadingState(actions);

  const dispatch = useDispatch();
  const { meta }: { meta: MetaReducer } = useTypedSelector((state) => state);

  const hasActionLoaded = (action: AnyAction) => {
    const actionNameWithUID = appendUIDToActionNamePrefix(action);

    return meta[actionNameWithUID]?.hasLoaded;
  };

  const handleTriggerActions = () => {
    actions.forEach((action) => {
      // Check if action hasLoaded already before dispatching:
      if (hasActionLoaded(action)) {
        return;
      }

      dispatch(action);
    });
  };

  // "React Hook useEffect has a missing dependency: 'handleTriggerActions'. Either include it or remove the dependency array"
  // TODO: handle this effect better, consider useCallback
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      handleTriggerActions();
    }

    return () => {
      mounted = false;
    };
    /** TODO: come up with more idiomatic way to handle this without stale closure */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
};

const metaCreator = () => ({ isCacheableRoutine: true });

/** An extension of createRoutine; types here are borrowed from @types/redux-saga-routines.
 * Allows us to extend routine stages to include `.invalidate` which takes the same payload as `.trigger`; letting us invalidate
 * "cached" routines when we need to
 */
export const createCacheableRoutine = <
  TTriggerPayloadCreator,
  TRequestPayloadCreator,
  TSuccessPayloadCreator,
  TFailurePayloadCreator
>(
  actionName: string,
  payloadCreator: {
    TRIGGER?: TTriggerPayloadCreator;
    trigger?: TTriggerPayloadCreator;
    REQUEST?: TRequestPayloadCreator;
    request?: TRequestPayloadCreator;
    SUCCESS?: TSuccessPayloadCreator;
    success?: TSuccessPayloadCreator;
    FAILURE?: TFailurePayloadCreator;
    failure?: TFailurePayloadCreator;
    /** Fulfill intentionally has the same type as the trigger payload creator.
     * This allows us to determine in metaReducer when an action `hasLoaded`
     */
    FULFILL?: TTriggerPayloadCreator;
    fulfill?: TTriggerPayloadCreator;
  },
): CacheableRoutine<
  TTriggerPayloadCreator,
  TRequestPayloadCreator,
  TSuccessPayloadCreator,
  TFailurePayloadCreator,
  TTriggerPayloadCreator
> => {
  const routineStages = [...defaultRoutineStages, 'INVALIDATE'];

  return createRoutineCreator(routineStages)(
    actionName,
    payloadCreator,
    metaCreator,
  );
};
