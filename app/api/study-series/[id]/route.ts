import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/study-series/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const serie = await prisma.ibrm_biblestudyserie.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_biblestudy: {
          orderBy: { serie_order: 'asc' },
          include: { ibrm_person: true },
        },
        ibrm_biblestudyserie_tags: {
          include: { ibrm_tag: true },
        },
      },
    })

    if (!serie) {
      return errorResponse('Study series not found', 404)
    }

    return successResponse({
      ...serie,
      id: serie.id.toString(),
      ibrm_biblestudy: serie.ibrm_biblestudy.map(study => ({
        ...study,
        id: study.id.toString(),
        author_id: study.author_id.toString(),
        serie_id: study.serie_id?.toString() || null,
        ibrm_person: { ...study.ibrm_person, id: study.ibrm_person.id.toString() },
      })),
    })
  } catch (error) {
    console.error('Error fetching study series:', error)
    return errorResponse('Failed to fetch study series')
  }
}

// PUT /api/study-series/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const serie = await prisma.ibrm_biblestudyserie.update({
      where: { id: BigInt(id) },
      data: {
        title: body.title,
        description: body.description,
        thumbnail: body.thumbnail,
        recomended: body.recomended,
        is_current_dominical: body.is_current_dominical,
      },
    })

    return successResponse({
      ...serie,
      id: serie.id.toString(),
    })
  } catch (error) {
    console.error('Error updating study series:', error)
    return errorResponse('Failed to update study series')
  }
}

// DELETE /api/study-series/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete tags relations first
    await prisma.ibrm_biblestudyserie_tags.deleteMany({
      where: { biblestudyserie_id: BigInt(id) },
    })
    
    // Update studies to remove serie reference
    await prisma.ibrm_biblestudy.updateMany({
      where: { serie_id: BigInt(id) },
      data: { serie_id: null },
    })
    
    await prisma.ibrm_biblestudyserie.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Study series deleted successfully' })
  } catch (error) {
    console.error('Error deleting study series:', error)
    return errorResponse('Failed to delete study series')
  }
}
