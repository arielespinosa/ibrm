import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/study-series
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)
    
    const isCurrent = searchParams.get('isCurrent')
    const recommended = searchParams.get('recommended')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (isCurrent === 'true') where.is_current_dominical = true
    if (recommended === 'true') where.recomended = true

    const [series, total] = await Promise.all([
      prisma.ibrm_biblestudyserie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          ibrm_biblestudy: {
            take: 5,
            orderBy: { serie_order: 'asc' },
          },
          ibrm_biblestudyserie_tags: {
            include: { ibrm_tag: true },
          },
        },
      }),
      prisma.ibrm_biblestudyserie.count({ where }),
    ])

    const serializedSeries = series.map(s => ({
      ...s,
      id: s.id.toString(),
      ibrm_biblestudy: s.ibrm_biblestudy.map(study => ({
        ...study,
        id: study.id.toString(),
        author_id: study.author_id.toString(),
        serie_id: study.serie_id?.toString() || null,
      })),
      ibrm_biblestudyserie_tags: s.ibrm_biblestudyserie_tags.map(t => ({
        ...t,
        id: t.id.toString(),
        biblestudyserie_id: t.biblestudyserie_id.toString(),
        tag_id: t.tag_id.toString(),
        ibrm_tag: { ...t.ibrm_tag, id: t.ibrm_tag.id.toString() },
      })),
    }))

    return paginatedResponse(serializedSeries, total, page, limit)
  } catch (error) {
    console.error('Error fetching study series:', error)
    return errorResponse('Failed to fetch study series')
  }
}

// POST /api/study-series
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const serie = await prisma.ibrm_biblestudyserie.create({
      data: {
        title: body.title,
        description: body.description,
        thumbnail: body.thumbnail || null,
        recomended: body.recomended || false,
        is_current_dominical: body.is_current_dominical || false,
        created: new Date(),
      },
    })

    return successResponse({
      ...serie,
      id: serie.id.toString(),
    }, 201)
  } catch (error) {
    console.error('Error creating study series:', error)
    return errorResponse('Failed to create study series')
  }
}
