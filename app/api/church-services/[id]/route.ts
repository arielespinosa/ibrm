import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/church-services/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const service = await prisma.ibrm_churchservice.findUnique({
      where: { id: BigInt(id) },
    })

    if (!service) {
      return errorResponse('Church service not found', 404)
    }

    return successResponse({
      ...service,
      id: service.id.toString(),
    })
  } catch (error) {
    console.error('Error fetching church service:', error)
    return errorResponse('Failed to fetch church service')
  }
}

// PUT /api/church-services/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const service = await prisma.ibrm_churchservice.update({
      where: { id: BigInt(id) },
      data: {
        day: body.day,
        title: body.title,
        time: body.time ? new Date(`1970-01-01T${body.time}`) : undefined,
      },
    })

    return successResponse({
      ...service,
      id: service.id.toString(),
    })
  } catch (error) {
    console.error('Error updating church service:', error)
    return errorResponse('Failed to update church service')
  }
}

// DELETE /api/church-services/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.ibrm_churchservice.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Church service deleted successfully' })
  } catch (error) {
    console.error('Error deleting church service:', error)
    return errorResponse('Failed to delete church service')
  }
}
