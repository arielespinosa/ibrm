import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/sister-churches/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const church = await prisma.ibrm_sisterchurch.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_sisterchurch_pastors: {
          include: { ibrm_person: true },
        },
      },
    })

    if (!church) {
      return errorResponse('Sister church not found', 404)
    }

    return successResponse({
      ...church,
      id: church.id.toString(),
      ibrm_sisterchurch_pastors: church.ibrm_sisterchurch_pastors.map(p => ({
        ...p,
        id: p.id.toString(),
        sisterchurch_id: p.sisterchurch_id.toString(),
        person_id: p.person_id.toString(),
        ibrm_person: { ...p.ibrm_person, id: p.ibrm_person.id.toString() },
      })),
    })
  } catch (error) {
    console.error('Error fetching sister church:', error)
    return errorResponse('Failed to fetch sister church')
  }
}

// PUT /api/sister-churches/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const church = await prisma.ibrm_sisterchurch.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        description: body.description,
        location: body.location,
        website_url: body.website_url,
        logo_url: body.logo_url,
        cover_url: body.cover_url,
      },
    })

    return successResponse({
      ...church,
      id: church.id.toString(),
    })
  } catch (error) {
    console.error('Error updating sister church:', error)
    return errorResponse('Failed to update sister church')
  }
}

// DELETE /api/sister-churches/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete pastors relations first
    await prisma.ibrm_sisterchurch_pastors.deleteMany({
      where: { sisterchurch_id: BigInt(id) },
    })
    
    await prisma.ibrm_sisterchurch.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Sister church deleted successfully' })
  } catch (error) {
    console.error('Error deleting sister church:', error)
    return errorResponse('Failed to delete sister church')
  }
}
