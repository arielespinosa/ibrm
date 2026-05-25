import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/sermon-series/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const serie = await prisma.ibrm_sermonserie.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_sermon: {
          orderBy: { serie_orden: 'asc' },
          include: { ibrm_person: true },
        },
        ibrm_sermonserie_speakers: {
          include: { ibrm_person: true },
        },
      },
    })

    if (!serie) {
      return errorResponse('Sermon series not found', 404)
    }

    return successResponse({
      ...serie,
      id: serie.id.toString(),
      ibrm_sermon: serie.ibrm_sermon.map(sermon => ({
        ...sermon,
        id: sermon.id.toString(),
        speaker_id: sermon.speaker_id.toString(),
        serie_id: sermon.serie_id?.toString() || null,
        ibrm_person: { ...sermon.ibrm_person, id: sermon.ibrm_person.id.toString() },
      })),
    })
  } catch (error) {
    console.error('Error fetching sermon series:', error)
    return errorResponse('Failed to fetch sermon series')
  }
}

// PUT /api/sermon-series/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const serie = await prisma.ibrm_sermonserie.update({
      where: { id: BigInt(id) },
      data: {
        title: body.title,
        description: body.description,
        thumbnail_url: body.thumbnail_url,
        is_current_dominical: body.is_current_dominical,
      },
    })

    return successResponse({
      ...serie,
      id: serie.id.toString(),
    })
  } catch (error) {
    console.error('Error updating sermon series:', error)
    return errorResponse('Failed to update sermon series')
  }
}

// DELETE /api/sermon-series/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete speakers relations first
    await prisma.ibrm_sermonserie_speakers.deleteMany({
      where: { sermonserie_id: BigInt(id) },
    })
    
    // Update sermons to remove serie reference
    await prisma.ibrm_sermon.updateMany({
      where: { serie_id: BigInt(id) },
      data: { serie_id: null },
    })
    
    await prisma.ibrm_sermonserie.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Sermon series deleted successfully' })
  } catch (error) {
    console.error('Error deleting sermon series:', error)
    return errorResponse('Failed to delete sermon series')
  }
}
