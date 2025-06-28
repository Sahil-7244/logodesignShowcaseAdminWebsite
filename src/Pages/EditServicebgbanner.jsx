import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditServicebgbanner() {
  const location = useLocation();
  const {servicebgImg} = location.state || {};
  const [data, setData] = useState({
    servicebgImgId: servicebgImg?._id || "",
    servicebgImgName: servicebgImg?.servicebgImgName || "",
    newserviceImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpdate = (files) => {
    setData((prevData) => ({
      ...prevData,
      newservicebgImage: files.length > 0 ? files[0].file : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await axios.post(
        `https://logodesignshowcasebackend-5.onrender.com/admin/editServicebgImg`,
        formData
      );
      if (response.data.success) {
        toast.success("servicebgImg Edited Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewservicebgbanner"),
        });
      } else {
        toast.error("serviceImg Not Edited!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Edit Service bg Image</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              service bg Image Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="ServicebgImg Title"
                              aria-label="title"
                              name="servicebgImgName"
                              onChange={handleChange}
                              value={data.servicebgImgName}
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <h5 className="card-title">service bg Image</h5>
                        <FilePond
                          name="servicebgImage"
                          credits={false}
                          className="single-file-filepond"
                          allowMultiple={false}
                          onupdatefiles={handleFileUpdate}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                      >
                        Submit
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

export default EditServicebgbanner;