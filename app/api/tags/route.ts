import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/tags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)

    const where: any = {}

    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    const [tags, total] = await Promise.all([
      prisma.ibrm_tag.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
      }),
      prisma.ibrm_tag.count({ where }),
    ])

    const serializedTags = tags.map(tag => ({
      ...tag,
      id: tag.id.toString(),
    }))

    return paginatedResponse(serializedTags, total, page, limit)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return errorResponse('Failed to fetch tags')
  }
}

// POST /api/tags
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const tag = await prisma.ibrm_tag.create({
      data: {
        name: body.name,
      },
    })

    return successResponse({
      ...tag,
      id: tag.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating tag:', error)
    return errorResponse('Failed to create tag')
  }
}
