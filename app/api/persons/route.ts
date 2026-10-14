import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/persons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)
    
    const isPastor = searchParams.get('isPastor')
    const isIbrmMember = searchParams.get('isIbrmMember')
    const isIbrmPastor = searchParams.get('isIbrmPastor')

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (isPastor === 'true') where.is_pastor = true
    if (isIbrmMember === 'true') where.is_ibrm_member = true
    if (isIbrmPastor === 'true') where.is_ibrm_pastor = true

    const [persons, total] = await Promise.all([
      prisma.ibrm_person.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
      }),
      prisma.ibrm_person.count({ where }),
    ])

    const serializedPersons = persons.map(person => ({
      ...person,
      id: person.id.toString(),
    }))

    return paginatedResponse(serializedPersons, total, page, limit)
  } catch (error) {
    console.error('Error fetching persons:', error)
    return errorResponse('Failed to fetch persons')
  }
}

// POST /api/persons
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const person = await prisma.ibrm_person.create({
      data: {
        name: body.name,
        bio: body.bio || null,
        is_pastor: body.is_pastor || false,
        is_ibrm_member: body.is_ibrm_member || false,
        is_ibrm_pastor: body.is_ibrm_pastor || false,
        avatar: body.avatar || null,
        email: body.email || null,
      },
    })

    return successResponse({
      ...person,
      id: person.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating person:', error)
    return errorResponse('Failed to create person')
  }
}
