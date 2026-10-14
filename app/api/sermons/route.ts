import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  parseQueryParams,
} from '@/lib/api-response'

// GET /api/sermons - List sermons with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip, search, orderBy, order } = parseQueryParams(searchParams)
    
    // Filter params
    const speakerId = searchParams.get('speakerId')
    const serieId = searchParams.get('serieId')
    const isStreaming = searchParams.get('isStreaming')
    const date = searchParams.get('date')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { scripture: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (speakerId) where.speaker_id = BigInt(speakerId)
    if (serieId) where.serie_id = BigInt(serieId)
    if (isStreaming === 'true') where.is_on_straming = true
    if (date) where.date = new Date(date)

    const [sermons, total] = await Promise.all([
      prisma.ibrm_sermon.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          ibrm_person: true,
          ibrm_sermonserie: true,
          ibrm_sermon_tags: {
            include: { ibrm_tag: true },
          },
        },
      }),
      prisma.ibrm_sermon.count({ where }),
    ])

    // Serialize BigInt to string for JSON
    const serializedSermons = sermons.map(sermon => ({
      ...sermon,
      id: sermon.id.toString(),
      speaker_id: sermon.speaker_id.toString(),
      serie_id: sermon.serie_id?.toString() || null,
      ibrm_person: sermon.ibrm_person ? {
        ...sermon.ibrm_person,
        id: sermon.ibrm_person.id.toString(),
      } : null,
      ibrm_sermonserie: sermon.ibrm_sermonserie ? {
        ...sermon.ibrm_sermonserie,
        id: sermon.ibrm_sermonserie.id.toString(),
      } : null,
      ibrm_sermon_tags: sermon.ibrm_sermon_tags.map(t => ({
        ...t,
        id: t.id.toString(),
        sermon_id: t.sermon_id.toString(),
        tag_id: t.tag_id.toString(),
        ibrm_tag: { ...t.ibrm_tag, id: t.ibrm_tag.id.toString() },
      })),
    }))

    return paginatedResponse(serializedSermons, total, page, limit)
  } catch (error) {
    console.error('Error fetching sermons:', error)
    return errorResponse('Failed to fetch sermons')
  }
}

// POST /api/sermons - Create a new sermon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const sermon = await prisma.ibrm_sermon.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        scripture: body.scripture,
        duration: body.duration,
        video_url: body.video_url || null,
        thumbnail_url: body.thumbnail_url || null,
        youtube_video_id: body.youtube_video_id || null,
        speaker_id: BigInt(body.speaker_id),
        serie_id: body.serie_id ? BigInt(body.serie_id) : null,
        serie_orden: body.serie_orden || null,
        is_on_straming: body.is_on_straming || false,
      },
      include: {
        ibrm_person: true,
        ibrm_sermonserie: true,
      },
    })

    return successResponse({
      ...sermon,
      id: sermon.id.toString(),
      speaker_id: sermon.speaker_id.toString(),
      serie_id: sermon.serie_id?.toString() || null,
    }, 201)
  } catch (error) {
    console.error('Error creating sermon:', error)
    return errorResponse('Failed to create sermon')
  }
}
