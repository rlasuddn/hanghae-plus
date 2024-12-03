import { Router, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/index"

import { verifyToken, checkCommentPermission } from "../middlewares/auth"

const router = Router()

router.get("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params
        const comment = await prisma.comment.findMany({
            where: {
                postId: Number(postId),
            },
            select: {
                id: true,
                content: true,
                author: {
                    select: {
                        nickname: true,
                    },
                },
            },
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        })
        res.json(comment)
    } catch (err) {
        next(err)
    }
})

router.post("/:postId", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: authorId } = req.user!
        const { content } = req.body
        const { postId } = req.params

        if (!content) {
            throw new Error("댓글 내용을 입력해주세요")
        }

        const create = await prisma.comment.create({
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

router.patch(
    "/:commentId",
    verifyToken,
    checkCommentPermission,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { content } = req.body
            const { commentId } = req.params

            if (!content) {
                throw new Error("댓글 내용을 입력해주세요")
            }

            const update = await prisma.comment.update({
                where: {
                    id: Number(commentId),
                },
                data: {
                    content,
                },
            })

            res.json(update)
        } catch (err) {
            next(err)
        }
    }
)

router.delete(
    "/:commentId",
    verifyToken,
    checkCommentPermission,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { commentId } = req.params

            const deleteRow = await prisma.comment.delete({
                where: { id: Number(commentId) },
            })

            res.json(deleteRow)
        } catch (err) {
            next(err)
        }
    }
)

export default router
