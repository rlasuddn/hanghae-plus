import { Router, Request, Response } from "express"

const router = Router()

router.get("/:postId", (req: Request, res: Response) => {
    console.log("aa")
    res.json("댓글 목록 조회")
})

router.post("/:postId", (req: Request, res: Response) => {
    res.json("댓글 작성")
})

router.patch("/:commentsId", (req: Request, res: Response) => {
    res.json("댓글 수정")
})

router.delete("/:commentsId", (req: Request, res: Response) => {
    res.json("댓글 삭제")
})

export default router
