
import { NextResponse } from "next/server"
import prisma from "@/lib/connect";

export const GET = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong !" },
      { status: 500 }
    );
    
  }

}