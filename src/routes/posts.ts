import { Router, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/index"

const router = Router()

router.get("/", async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            createdAt: true,
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                },
            },
        },
        take: 10,
    })
    res.json(posts)
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId: authorId, title, content, password } = req.body
        const create = await prisma.post.create({
            data: {
                title,
                content,
                password,
                author: {
                    connect: { id: authorId },
                },
            },
        })
        console.log("🚀 ~ router.post ~ create:", create)
        res.json(create)
    } catch (err) {
        next(err)
    }
})

router.get("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params

        const post = await prisma.post.findFirst({
            where: {
                id: Number(postId),
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        res.json(post)
    } catch (err) {
        next(err)
    }
})

router.patch("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params
        const { password, content } = req.body

        const update = await prisma.post.update({
            where: {
                id: Number(postId),
                password,
            },
            data: {
                content,
            },
        })

        res.json(update)
    } catch (err) {
        next(err)
    }
})

router.delete("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params
        const { password } = req.body

        const deleteRow = await prisma.post.delete({
            where: {
                id: Number(postId),
                password,
            },
        })

        res.json(deleteRow)
    } catch (err) {
        next(err)
    }
})

export default router
