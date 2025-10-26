import express from "express";
import auth from "../Middlewares/auth.js";
import { upload } from "../Config/multerSetup.js";
import registerBike from "../Controllers/Provider/registerBike.js";
import getRegisteredBikes  from "../Controllers/Provider/getRegisteredBikes.js";
import unregisterBike from "../Controllers/Provider/unregisterBike.js";
import provideBike from "../Controllers/Provider/provideBike.js";
import removeProvidedBike from "../Controllers/Provider/removeProvidedBike.js";
import getAllProvidedBikeDetails from "../Controllers/Provider/getProvidedBikeDetails.js";

const router = express.Router();

// Route to register a vehicle
router.post(
  "/register-bike",
  upload.fields([
    { name: "thumbnail", maxCount: 1 }, // Field for the vehicle thumbnail image
    { name: "ownershipProof", maxCount: 1 }, // Field for the ownership proof image
  ]),
  auth,
  registerBike
);

router.get("/my-bikes", auth, getRegisteredBikes);
router.get("/get-provided-bikes", auth, getAllProvidedBikeDetails);
router.post("/unregister-bike", auth, unregisterBike);
router.post("/provide-bike", auth, provideBike);
router.post("/remove-provided-bike", auth, removeProvidedBike);

export default router;
