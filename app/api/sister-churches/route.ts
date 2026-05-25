import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/sister-churches
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [churches, total] = await Promise.all([
      prisma.ibrm_sisterchurch.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          ibrm_sisterchurch_pastors: {
            include: { ibrm_person: true },
          },
        },
      }),
      prisma.ibrm_sisterchurch.count({ where }),
    ])

    const serializedChurches = churches.map(church => ({
      ...church,
      id: church.id.toString(),
      ibrm_sisterchurch_pastors: church.ibrm_sisterchurch_pastors.map(p => ({
        ...p,
        id: p.id.toString(),
        sisterchurch_id: p.sisterchurch_id.toString(),
        person_id: p.person_id.toString(),
        ibrm_person: { ...p.ibrm_person, id: p.ibrm_person.id.toString() },
      })),
    }))

    return paginatedResponse(serializedChurches, total, page, limit)
  } catch (error) {
    console.error('Error fetching sister churches:', error)
    return errorResponse('Failed to fetch sister churches')
  }
}

// POST /api/sister-churches
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const church = await prisma.ibrm_sisterchurch.create({
      data: {
        name: body.name,
        description: body.description,
        location: body.location,
        website_url: body.website_url || null,
        logo_url: body.logo_url || null,
        cover_url: body.cover_url || null,
      },
    })

    return successResponse({
      ...church,
      id: church.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating sister church:', error)
    return errorResponse('Failed to create sister church')
  }
}
