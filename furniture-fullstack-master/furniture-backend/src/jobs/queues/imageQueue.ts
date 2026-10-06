import { Queue } from "bullmq";

import { redisConnection } from "../../../config/redisClient";

const ImageQueue = new Queue("imageQueue", { connection: redisConnection });

export default ImageQueue;
