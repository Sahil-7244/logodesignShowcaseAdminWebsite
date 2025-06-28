// Import the useState hook to manage state
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { toast } from "react-toastify";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddProduct() {
  const navigate = useNavigate();
  var maxLength = 100;

  const [isLoaded, setLoaded] = useState(true);
  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    category: "",
    productImage: null,
  });

  const categories=[
    "Logo Design",
    "Pouch Packaging",
    "Box Packaging",
    "Container Packaging",
    "Sticker Design",
    "Label Design",
    "Brochure Design",
    "Catalogue Design",
    "Flyer Design",
    "Banner Design",
    "Stationery Design",
    "UI/UX",
    "Website Design"
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (files) => {
    setProductData((prevData) => ({
      ...prevData,
      productImage: files.length > 0 ? files[0].file : null,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);

    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/admin/addProducts`,
        formData
      );

      if (response.data.success) {
        toast.success("Product Added Successfully!!", {
          autoClose: 1500,
          // onClose: () => navigate("/viewProduct"),
          // onClose: () => setProductData({
          //   productName: "",
          //   productDesc: "",
          //   category: "",
          //   productImage: null,
          // }),
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    } finally {
      setLoaded(true);
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Add Product</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      encType="multipart/form-data"
                      onSubmit={handleProductSubmit}
                    >
                      <div className="row">
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              Product Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Product Name"
                              name="productName"
                              onChange={handleChange}
                              value={productData.productName}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-group with-title mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              onChange={handleChange}
                              name="productDesc"
                              value={productData.productDesc}
                              required
                            />
                            <label>Product Description</label>
                            <div>
                              {maxLength - productData.productDesc.length} characters remaining
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select"
                            name="category"
                            onChange={handleChange}
                            value={productData.category}
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map((category,index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        

                        <h5 className="card-title">Product Images</h5>
                        <FilePond
                          files={
                            productData.productImage
                              ? [{ source: productData.productImage }]
                              : []
                          }
                          name="productImage"
                          credits={false}
                          className="single-file-filepond"
                          allowMultiple={false}
                          onupdatefiles={handleFileChange}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                        disabled={!isLoaded}
                      >
                        {isLoaded ? "Submit" : "Loading..."}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
