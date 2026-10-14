import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/sermon-series - List sermon series with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)
    
    const isCurrent = searchParams.get('isCurrent')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (isCurrent === 'true') where.is_current_dominical = true

    const [series, total] = await Promise.all([
      prisma.ibrm_sermonserie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          ibrm_sermon: {
            take: 5,
            orderBy: { date: 'desc' },
          },
          ibrm_sermonserie_speakers: {
            include: { ibrm_person: true },
          },
        },
      }),
      prisma.ibrm_sermonserie.count({ where }),
    ])

    const serializedSeries = series.map(s => ({
      ...s,
      id: s.id.toString(),
      ibrm_sermon: s.ibrm_sermon.map(sermon => ({
        ...sermon,
        id: sermon.id.toString(),
        speaker_id: sermon.speaker_id.toString(),
        serie_id: sermon.serie_id?.toString() || null,
      })),
      ibrm_sermonserie_speakers: s.ibrm_sermonserie_speakers.map(sp => ({
        ...sp,
        id: sp.id.toString(),
        sermonserie_id: sp.sermonserie_id.toString(),
        person_id: sp.person_id.toString(),
        ibrm_person: { ...sp.ibrm_person, id: sp.ibrm_person.id.toString() },
      })),
    }))

    return paginatedResponse(serializedSeries, total, page, limit)
  } catch (error) {
    console.error('Error fetching sermon series:', error)
    return errorResponse('Failed to fetch sermon series')
  }
}

// POST /api/sermon-series - Create a new sermon series
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const serie = await prisma.ibrm_sermonserie.create({
      data: {
        title: body.title,
        description: body.description || null,
        thumbnail_url: body.thumbnail_url || null,
        is_current_dominical: body.is_current_dominical || false,
      },
    })

    return successResponse({
      ...serie,
      id: serie.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating sermon series:', error)
    return errorResponse('Failed to create sermon series')
  }
}
