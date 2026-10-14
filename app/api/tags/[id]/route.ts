import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/tags/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const tag = await prisma.ibrm_tag.findUnique({
      where: { id: BigInt(id) },
    })

    if (!tag) {
      return errorResponse('Tag not found', 404)
    }

    return successResponse({
      ...tag,
      id: tag.id.toString(),
    })
  } catch (error) {
    console.error('Error fetching tag:', error)
    return errorResponse('Failed to fetch tag')
  }
}

// PUT /api/tags/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const tag = await prisma.ibrm_tag.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
      },
    })

    return successResponse({
      ...tag,
      id: tag.id.toString(),
    })
  } catch (error) {
    console.error('Error updating tag:', error)
    return errorResponse('Failed to update tag')
  }
}

// DELETE /api/tags/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete from junction tables first
    await prisma.ibrm_sermon_tags.deleteMany({
      where: { tag_id: BigInt(id) },
    })
    
    await prisma.ibrm_biblestudyserie_tags.deleteMany({
      where: { tag_id: BigInt(id) },
    })
    
    await prisma.ibrm_tag.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Tag deleted successfully' })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return errorResponse('Failed to delete tag')
  }
}
