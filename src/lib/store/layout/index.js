import layout, {
  ADD_UNKNOWN_URL,
  RESET_LAYOUT,
  SET_CACHED_LAYOUT,
  SET_LAYOUT,
  UPDATE_LAYOUT,
} from './layout';

export const LayoutNamespace = 'layout';

export const LayoutMutationTypes = {
  SET_LAYOUT: `${LayoutNamespace}/${SET_LAYOUT}`,
  SET_CACHED_LAYOUT: `${LayoutNamespace}/${SET_CACHED_LAYOUT}`,
  ADD_UNKNOWN_URL: `${LayoutNamespace}/${ADD_UNKNOWN_URL}`,
};

export const LayoutActionTypes = {
  UPDATE_LAYOUT: `${LayoutNamespace}/${UPDATE_LAYOUT}`,
  RESET_LAYOUT: `${LayoutNamespace}/${RESET_LAYOUT}`,
};

export default layout;
