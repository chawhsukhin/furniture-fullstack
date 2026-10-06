import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/authService";
import { errorCodes } from "../../config/errorCode";
import { createError } from "../utils/error";

interface CustomRequest extends Request {
  userId?: number;
  user?: any;
}
// authorise(true, "ADMIN", "AUTHOR") // deny - "USER"
// authorise(false, "USER") // allow - "ADMIN", "AUTHOR"

export const authorise = (permission: boolean, ...roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    if (!user) {
      return next(
        createError(
          "This account has not registered!",
          401,
          errorCodes.unauthenticated
        )
      );
    }

    const result = roles.includes(user.role);

    // permission && result

    if (permission && !result) {
      const err: any = new Error("This action is not allowed.");
      err.status = 403;
      err.code = errorCodes.unAuthorised;
      return next(
        createError("This action is not allowed.", 403, errorCodes.unAuthorised)
      );
    }

    if (!permission && result) {
      return next(
        createError("This action is not allowed.", 403, errorCodes.unAuthorised)
      );
    }

    req.user = user;
    next();
  };
};
