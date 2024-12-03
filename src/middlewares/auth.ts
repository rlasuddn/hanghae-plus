import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import prisma from "../../prisma"

//Request객체 user키 추가
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

//토큰 검증
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token }: { [key: string]: string } = req.signedCookies
        if (!token) {
            throw new Error("Token not exists!")
        }
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload

        const checkUser = await prisma.user.findUnique({
            where: {
                id: userInfo.id,
            },
            select: {
                id: true,
            },
        })

        if (!checkUser) {
            throw new Error("This is invalid member information!")
        }

        req.user = userInfo

        next()
    } catch (err) {
        next(err)
    }
}

//게시물 액션 관련 회원 검증
export const checkPostsPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req
        const { postId } = req.params

        const checkPostId = await prisma.post.findUnique({
            where: {
                id: Number(postId),
                author: {
                    id: user?.id,
                },
            },
        })

        if (!checkPostId) {
            throw new Error("Permission denied")
        }
        next()
    } catch (err) {
        next(err)
    }
}

//댓글 액션 관련 회원 검증
export const checkCommentsPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req
        console.log("🚀 ~ checkCommentsPermission ~ user:", user)
        const { commentsId } = req.params

        const checkPostId = await prisma.comments.findUnique({
            where: {
                id: Number(commentsId),
                author: {
                    id: user?.id,
                },
            },
        })

        if (!checkPostId) {
            throw new Error("Permission denied")
        }
        next()
    } catch (err) {
        next(err)
    }
}
