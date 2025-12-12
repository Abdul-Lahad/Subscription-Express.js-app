import aj from "../config/arcjet.js";


const arcjetMiddleware = async (req, res, next) => {
    try {

        const decision = await aj.protect(req,{requested: 5});

        if (decision.isDenied()) {
           if(decision.reason.isRateLimit()) return res.status(429).send("Too Many Requests - Rate limit exceeded by Arcjet");
           else if(decision.reason.isBot()) return res.status(403).send("Access Denied - Bot detected by Arcjet");
           else return res.status(403).send("Access Denied - Arcjet Protection");
        } else {
            next();
        }
    } catch (error) {
        console.log(`Arcjet Meddleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;

