import dbConnect from "@/lib/dbConnect";
import verifyJWT from "@/middlewares/verifyJWT";
import Product from "@/models/Product";

export default async function handler(req, res) {
    await dbConnect()
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const products = await Product.find({})
                res.status(200).json({ data: products })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try {
                const { userId } = verifyJWT(req.headers.authorization)
                req.body.user = userId
                Product.create(req.body)
                res.status(201).json({ success: true, data: req.body })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}