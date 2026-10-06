import express from "express";
import {
  changeLanguage,
  testPermission,
  uploadProfile,
  getMyPhoto,
  uploadProfileMultiple,
  uploadProfileOptimize,
} from "../../../controllers/api/profileController";
import { auth } from "../../../middlewares/auth";
import upload, { uploadMemory } from "../../../middlewares/uploadFile";
import {
  getPostsByPagination,
  getInfinitePostsByPagination,
  getPost,
} from "../../../controllers/api/postController";
import {
  getProduct,
  getProductsByPagination,
  getCategoryType,
  toggleFavourite,
} from "../../../controllers/api/productController";
import { changePassword } from "../../../controllers/authController";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

router.patch("/profile/upload", auth, upload.single("avatar"), uploadProfile);
router.patch(
  "/profile/upload/optimize",
  auth,
  upload.single("avatar"),
  uploadProfileOptimize,
);
router.patch(
  "/profile/upload/multiple",
  auth,
  upload.array("avatar"),
  uploadProfileMultiple,
);

router.get("/profile/my-photo", getMyPhoto); // Just for testing

router.get("/posts", getPostsByPagination); // Offset Pagination
router.get("/posts/infinite", getInfinitePostsByPagination); // Cursor-based Pagination
router.get("/posts/:id", getPost);

router.get("/products/:id", getProduct);
router.get("/products", getProductsByPagination); // Cursor-based Pagination

router.get("/filter-type", getCategoryType);
router.patch("/products/toggle-favourite", auth, toggleFavourite);

router.patch("/change-password", auth, changePassword);

export default router;
