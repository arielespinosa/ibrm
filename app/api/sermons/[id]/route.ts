import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/sermons/[id] - Get single sermon
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const sermon = await prisma.ibrm_sermon.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_person: true,
        ibrm_sermonserie: true,
        ibrm_sermon_tags: {
          include: { ibrm_tag: true },
        },
      },
    })

    if (!sermon) {
      return errorResponse('Sermon not found', 404)
    }

    return successResponse({
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
    })
  } catch (error) {
    console.error('Error fetching sermon:', error)
    return errorResponse('Failed to fetch sermon')
  }
}

// PUT /api/sermons/[id] - Update sermon
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const sermon = await prisma.ibrm_sermon.update({
      where: { id: BigInt(id) },
      data: {
        title: body.title,
        description: body.description,
        date: body.date ? new Date(body.date) : undefined,
        scripture: body.scripture,
        duration: body.duration,
        video_url: body.video_url,
        thumbnail_url: body.thumbnail_url,
        youtube_video_id: body.youtube_video_id,
        speaker_id: body.speaker_id ? BigInt(body.speaker_id) : undefined,
        serie_id: body.serie_id ? BigInt(body.serie_id) : null,
        serie_orden: body.serie_orden,
        is_on_straming: body.is_on_straming,
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
    })
  } catch (error) {
    console.error('Error updating sermon:', error)
    return errorResponse('Failed to update sermon')
  }
}

// DELETE /api/sermons/[id] - Delete sermon
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // First delete related tags
    await prisma.ibrm_sermon_tags.deleteMany({
      where: { sermon_id: BigInt(id) },
    })
    
    await prisma.ibrm_sermon.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Sermon deleted successfully' })
  } catch (error) {
    console.error('Error deleting sermon:', error)
    return errorResponse('Failed to delete sermon')
  }
}
