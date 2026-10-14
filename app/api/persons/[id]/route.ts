import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/persons/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const person = await prisma.ibrm_person.findUnique({
      where: { id: BigInt(id) },
      include: {
        ibrm_sermon: {
          take: 10,
          orderBy: { date: 'desc' },
        },
        ibrm_biblestudy: {
          take: 10,
          orderBy: { created: 'desc' },
        },
      },
    })

    if (!person) {
      return errorResponse('Person not found', 404)
    }

    return successResponse({
      ...person,
      id: person.id.toString(),
      ibrm_sermon: person.ibrm_sermon.map(s => ({
        ...s,
        id: s.id.toString(),
        speaker_id: s.speaker_id.toString(),
        serie_id: s.serie_id?.toString() || null,
      })),
      ibrm_biblestudy: person.ibrm_biblestudy.map(s => ({
        ...s,
        id: s.id.toString(),
        author_id: s.author_id.toString(),
        serie_id: s.serie_id?.toString() || null,
      })),
    })
  } catch (error) {
    console.error('Error fetching person:', error)
    return errorResponse('Failed to fetch person')
  }
}

// PUT /api/persons/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const person = await prisma.ibrm_person.update({
      where: { id: BigInt(id) },
      data: {
        name: body.name,
        bio: body.bio,
        is_pastor: body.is_pastor,
        is_ibrm_member: body.is_ibrm_member,
        is_ibrm_pastor: body.is_ibrm_pastor,
        avatar: body.avatar,
        email: body.email,
      },
    })

    return successResponse({
      ...person,
      id: person.id.toString(),
    })
  } catch (error) {
    console.error('Error updating person:', error)
    return errorResponse('Failed to update person')
  }
}

// DELETE /api/persons/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if person has related records
    const hasSermons = await prisma.ibrm_sermon.count({
      where: { speaker_id: BigInt(id) },
    })
    
    const hasStudies = await prisma.ibrm_biblestudy.count({
      where: { author_id: BigInt(id) },
    })
    
    if (hasSermons > 0 || hasStudies > 0) {
      return errorResponse('Cannot delete person with related sermons or studies', 400)
    }
    
    // Delete from junction tables
    await prisma.ibrm_sermonserie_speakers.deleteMany({
      where: { person_id: BigInt(id) },
    })
    
    await prisma.ibrm_sisterchurch_pastors.deleteMany({
      where: { person_id: BigInt(id) },
    })
    
    await prisma.ibrm_person.delete({
      where: { id: BigInt(id) },
    })

    return successResponse({ message: 'Person deleted successfully' })
  } catch (error) {
    console.error('Error deleting person:', error)
    return errorResponse('Failed to delete person')
  }
}
