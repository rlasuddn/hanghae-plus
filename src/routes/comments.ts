import { Router, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/index"

const router = Router()

router.get("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params
        const comments = await prisma.comments.findMany({
            where: {
                postId: Number(postId),
            },
            select: {
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        })
        res.json(comments)
    } catch (err) {
        next(err)
    }
})

router.post("/:postId/:authorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body
        const { postId, authorId } = req.params

        if (!content) {
            throw new Error("댓글 내용을 입력해주세요")
        }

        const create = await prisma.comments.create({
            data: {
                content,
                author: {
                    connect: { id: Number(authorId) },
                },
                post: {
                    connect: { id: Number(postId) },
                },
            },
        })
        res.json(create)
    } catch (err) {
        next(err)
    }
})

router.patch("/:commentsId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content } = req.body
        const { commentsId } = req.params

        if (!content) {
            throw new Error("댓글 내용을 입력해주세요")
        }

        const update = await prisma.comments.update({
            where: {
                id: Number(commentsId),
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

router.delete("/:commentsId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentsId } = req.params

        const deleteRow = await prisma.comments.delete({
            where: { id: Number(commentsId) },
        })

        res.json(deleteRow)
    } catch (err) {
        next(err)
    }
})

export default router
