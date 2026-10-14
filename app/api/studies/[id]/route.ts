import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/studies/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const study = await prisma.ibrm_biblestudy.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_person: true,
        ibrm_biblestudyserie: true,
      },
    })

    if (!study) {
      return errorResponse('Study not found', 404)
    }

    return successResponse({
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
    })
  } catch (error) {
    console.error('Error fetching study:', error)
    return errorResponse('Failed to fetch study')
  }
}

// PUT /api/studies/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const study = await prisma.ibrm_biblestudy.update({
      where: { id: BigInt(id) },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        author_id: body.author_id ? BigInt(body.author_id) : undefined,
        serie_id: body.serie_id ? BigInt(body.serie_id) : null,
        serie_order: body.serie_order,
        thumbnail: body.thumbnail,
        file: body.file,
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
    })
  } catch (error) {
    console.error('Error updating study:', error)
    return errorResponse('Failed to update study')
  }
}

// DELETE /api/studies/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.ibrm_biblestudy.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Study deleted successfully' })
  } catch (error) {
    console.error('Error deleting study:', error)
    return errorResponse('Failed to delete study')
  }
}
