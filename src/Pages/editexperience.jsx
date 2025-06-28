import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function EditExperience() {
    const location = useLocation();
 const {experiencestate} = location.state || {};
  const [data, setData] = useState({
    experienceId: experiencestate?._id || "",
    experience: experiencestate?.experience || "",
    appsdeveloped: experiencestate?.appsdeveloped || "",
    consultants: experiencestate?.consultants || "",
    awardswon: experiencestate?.awardswon || "",
    employee: experiencestate?.employee || "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/editexperience`,
        data
      );
      if (response.data.success) {
        toast.success("experience Updated Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewexp"),
        });
      } else {
        toast.error("experience Not Added!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
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
            <h3>Edit experience Details</h3>
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
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Experience
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="experience"
                              aria-label="title"
                              value={data.experience}
                              name="experience"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Projects completed
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="appsdeveloped"
                              aria-label="title"
                              name="appsdeveloped"
                              maxLength={10}
                              value={data.appsdeveloped}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              consultants
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="consultants"
                              aria-label="title"
                              name="consultants"
                              maxLength={10}
                              value={data.consultants}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              awardswon
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="awardswon"
                              aria-label="title"
                              name="awardswon"
                              maxLength={10}
                              value={data.awardswon}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              employee
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="employee"
                              aria-label="title"
                              name="employee"
                              maxLength={10}
                              value={data.employee}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                      >
                        Update
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

export default EditExperience;