import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/studies - List bible studies with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)
    
    const authorId = searchParams.get('authorId')
    const serieId = searchParams.get('serieId')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (authorId) where.author_id = BigInt(authorId)
    if (serieId) where.serie_id = BigInt(serieId)

    const [studies, total] = await Promise.all([
      prisma.ibrm_biblestudy.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          ibrm_person: true,
          ibrm_biblestudyserie: true,
        },
      }),
      prisma.ibrm_biblestudy.count({ where }),
    ])

    const serializedStudies = studies.map(study => ({
      ...study,
      id: study.id.toString(),
      author_id: study.author_id.toString(),
      serie_id: study.serie_id?.toString() || null,
      ibrm_person: study.ibrm_person ? {
        ...study.ibrm_person,
        id: study.ibrm_person.id.toString(),
      } : null,
      ibrm_biblestudyserie: study.ibrm_biblestudyserie ? {
        ...study.ibrm_biblestudyserie,
        id: study.ibrm_biblestudyserie.id.toString(),
      } : null,
    }))

    return paginatedResponse(serializedStudies, total, page, limit)
  } catch (error) {
    console.error('Error fetching studies:', error)
    return errorResponse('Failed to fetch studies')
  }
}

// POST /api/studies - Create a new bible study
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const study = await prisma.ibrm_biblestudy.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        author_id: BigInt(body.author_id),
        serie_id: body.serie_id ? BigInt(body.serie_id) : null,
        serie_order: body.serie_order || null,
        thumbnail: body.thumbnail || null,
        file: body.file || null,
        created: new Date(),
      },
      include: {
        ibrm_person: true,
        ibrm_biblestudyserie: true,
      },
    })

    return successResponse({
      ...study,
      id: study.id.toString(),
      author_id: study.author_id.toString(),
      serie_id: study.serie_id?.toString() || null,
    }, 201)
  } catch (error) {
    console.error('Error creating study:', error)
    return errorResponse('Failed to create study')
  }
}
