import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/church-services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { day: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [services, total] = await Promise.all([
      prisma.ibrm_churchservice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
      }),
      prisma.ibrm_churchservice.count({ where }),
    ])

    const serializedServices = services.map(service => ({
      ...service,
      id: service.id.toString(),
    }))

    return paginatedResponse(serializedServices, total, page, limit)
  } catch (error) {
    console.error('Error fetching church services:', error)
    return errorResponse('Failed to fetch church services')
  }
}

// POST /api/church-services
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const service = await prisma.ibrm_churchservice.create({
      data: {
        day: body.day,
        title: body.title,
        time: new Date(`1970-01-01T${body.time}`),
      },
    })

    return successResponse({
      ...service,
      id: service.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating church service:', error)
    return errorResponse('Failed to create church service')
  }
}
