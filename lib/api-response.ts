const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function jsonResponse<T>(data: T, init?: ResponseInit) {
  const headers = new Headers(init?.headers);

  Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));

  return Response.json(data, { ...init, headers });
}

export function optionsResponse() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
