import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface BlogPostPayload {
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  published: boolean
  thumbnail?: string | null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BlogPostPayload

    if (!body.title || !body.excerpt || !body.content || !body.author || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      )
    }

    const created = {
      id: Date.now().toString(),
      ...body,
      thumbnail: body.thumbnail || null,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('Error creando entrada de blog:', error)
    return NextResponse.json({ success: false, message: 'No se pudo crear la entrada' }, { status: 500 })
  }
}
