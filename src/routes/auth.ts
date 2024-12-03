import { Router, Request, Response, NextFunction } from "express"
import prisma from "../../prisma"

import { z } from "zod"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/join", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nickname, password, passwordCheck } = req.body

        const joinRegex = /^[a-zA-Z0-9]+$/

        const joinSchema = z
            .object({
                nickname: z.string().min(3).regex(joinRegex),
                password: z.string().min(4),
                passwordCheck: z.string().min(4),
            })
            .refine((data) => !data.password.includes(data.nickname), {
                message: "비밀번호에 닉네임이 포함됩니다.",
                path: ["password"],
            })
            .refine((data) => data.password === data.passwordCheck, {
                message: "비밀번호를 확인해주세요.",
            })

        joinSchema.parse({ nickname, password, passwordCheck })

        const duplicateNickname = await prisma.user.findUnique({
            where: {
                nickname,
            },
        })

        if (duplicateNickname) {
            throw new Error("중복된 닉네임입니다.")
        }

        const create = await prisma.user.create({
            data: {
                nickname,
                password,
            },
        })
        res.json(create)
    } catch (err) {
        next(err)
    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nickname, password } = req.body

        const joinRegex = /^[a-zA-Z0-9]+$/

        const joinSchema = z.object({
            nickname: z.string().min(3).regex(joinRegex),
            password: z.string().min(4),
        })

        joinSchema.parse({ nickname, password })

        const findUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        nickname,
                    },
                    {
                        password,
                    },
                ],
            },
        })
        if (!findUser || findUser?.nickname !== nickname || findUser?.password !== password) {
            throw new Error("닉네임 또는 패스워드를 확인해주세요.")
        }

        const token = jwt.sign({ id: findUser }, process.env.JWT_SECRET_KEY!, {
            expiresIn: "1d",
        })

        res.cookie(`token${findUser.id}`, token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            secure: true,
        })
        res.json({ findUser, token })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

export default router
