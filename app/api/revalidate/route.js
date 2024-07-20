import { revalidatePath } from 'next/cache'
import {  NextResponse } from 'next/server'

export async function GET(request)
{
    const token = request.netUrl.searchParams.get("slug");
    if(!token || token !== process.env.ADMIN_TOKEN)
        return NextResponse.json({ error: "Not Authorized"}, { status:404 });

    revalidatePath('/', 'layout');

    return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        message: 'Revalidated All Data',
      })
}