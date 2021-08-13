export function resultSuccess<T = any>(result: T, { message = 'ok' } = {}) {
  return {
    status: 200,
    content: result,
    message,
    success: true,
  };
}

export function resultError(message = 'Request failed', { status = -1, result = null } = {}) {
  return {
    status,
    content: result,
    message,
    success: true,
  };
}
