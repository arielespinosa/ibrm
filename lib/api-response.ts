import { serializeBigInt } from '@/app/api/utils';
import { NextResponse } from 'next/server'

export function successResponse(data: any, status = 200) {
  const responseData = serializeBigInt(data);
  return NextResponse.json({ success: true, }, { status })
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}

export function parseQueryParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''
  const orderBy = searchParams.get('orderBy') || 'id'
  const order = (searchParams.get('order') || 'desc') as 'asc' | 'desc'

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    search,
    orderBy,
    order,
  }
}
