import type { FunctionalComponent } from 'vue';
import type { RouteLocation } from 'vue-router';

export function getKey(component: FunctionalComponent & { type: Indexable }, route: RouteLocation) {
  return !!component?.type.parentView ? {} : { key: route.fullPath };
}
