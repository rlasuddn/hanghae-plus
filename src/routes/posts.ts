import { Router, Request, Response } from "express"

const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.json("제목, 작성자명, 작성 날짜")
})

router.post("/", (req: Request, res: Response) => {
    res.json("게시물 작성")
})

router.get("/:postId", (req: Request, res: Response) => {
    res.json("게시물 조회")
})

router.patch("/:postId", (req: Request, res: Response) => {
    res.json("게시물 수정")
})

router.delete("/:postId", (req: Request, res: Response) => {
    res.json("게시물 삭제")
})

export default router
