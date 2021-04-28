import { Router } from 'vue-router';
import { createProgressGuard } from './progressGuard';
import { createPermissionGuard } from './permissionGuard'
import { createPageLoadingGuard } from './createPageLoadingGuard';

export function createGuard(router: Router) {
  createProgressGuard(router);
  createPageLoadingGuard(router);
  createPermissionGuard(router);
}
