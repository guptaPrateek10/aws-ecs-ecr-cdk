// controllers/productController.ts
import { Request, Response } from "express";
import Product, { IProduct } from "../schema/productSchema";
import { uploadToS3 } from "../middleware/upload";
import fileUpload = require("express-fileupload");
import mongoose from "mongoose";
// import upload from "../middleware/upload";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  console.log("req.files", req.files);
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description, price, CategoryData, stock } =
      req.body as IProduct;

    // Step 1: Create the product without image URL
    const newProduct = new Product({
      name,
      description,
      price,
      CategoryData,
      stock,
      images: "",
    });

    const savedProduct = await newProduct.save({ session });

    if (!req.files || !req.files.image) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageFile = req.files.image as fileUpload.UploadedFile;
    const folderName = `${savedProduct._id}`;

    // Step 3: Upload the image to S3
    const imageUrl = await uploadToS3(
      imageFile.data,
      imageFile.name,
      folderName
    );

    // Step 4: Update product with image URL
    savedProduct.images.push(imageUrl);
    await savedProduct.save({ session }); // Save the image URL within the transaction session

    await session.commitTransaction(); // Commit transaction if all went well
    session.endSession();

    res.status(201).json(savedProduct);
  } catch (error) {
    await session.abortTransaction(); // Roll back the transaction if any error occurs
    session.endSession();
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("CategoryData");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
