import { Router } from 'vue-router';
import { createPageLoadingGuard } from './createPageLoadingGuard';

export function createGuard(router: Router) {
  createPageLoadingGuard(router);
}
