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
import { useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddCarouselImg() {
const [isLoaded,setIsloded] = useState(true);
  const [data, setData] = useState({
    carouselImgName: "",
    carouselImage: null,
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
      carouselImage: files.length > 0 ? files[0].file : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloded(false);

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/addCarouselImg`,
        formData
      );
      if (response.data.success) {
        toast.success("carouselimage Added Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewcarouselimg"),
        });
      } else {
        toast.error("carouselimg Not Added!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    } finally{
        setIsloded(true);
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Add carousel image</h3>
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
                              carousel image Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="carousel img Title"
                              aria-label="title"
                              name="carouselImgName"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <h5 className="card-title">carousel Image</h5>
                        <FilePond
                          files={
                            data.carouselImage
                              ? [{ source: data.carouselImage }]
                              : []
                          }
                          name="carouselImage"
                          credits={false}
                          className="single-file-filepond"
                          allowMultiple={false}
                          onupdatefiles={handleFileUpdate}
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

export default AddCarouselImg;
